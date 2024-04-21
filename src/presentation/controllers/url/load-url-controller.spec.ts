import { URLModel } from '../../../domain/models/url';
import { LoadURLBySuffix } from '../../../domain/use-cases/load-url-by-suffix';
import { MissingParamError, InvalidParamError } from '../../errors';
import { badRequest } from '../../helpers/http-helper';
import { SuffixValidator } from '../../protocols/suffix-validator';
import { LoadURLController } from './load-url-controller';

describe('LoadURLController', () => {
  class SuffixValidatorStub implements SuffixValidator {
    isValid() {
      return true;
    }
  }
  class LoadURLStub implements LoadURLBySuffix {
    async load(suffix: string): Promise<URLModel> {
      return new Promise((resolve) =>
        resolve({
          originalURL: 'http://g.com',
          suffix: 'Suffix',
          createdAt: new Date(1),
          expiresAt: new Date(1),
        }),
      );
    }
  }
  const makeSut = (): {
    sut: LoadURLController;
    suffixValidatorStub: SuffixValidatorStub;
    loadURLStub: LoadURLStub;
  } => {
    const suffixValidatorStub = new SuffixValidatorStub();
    const loadURLStub = new LoadURLStub();
    return {
      sut: new LoadURLController(suffixValidatorStub, loadURLStub),
      suffixValidatorStub,
      loadURLStub,
    };
  };

  it('Should return 400 if no suffix is provided in params', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      params: {},
    };
    const response = await sut.handle(httpRequest);
    const expected = badRequest(new MissingParamError('Suffix'));
    expect(response).toEqual(expected);
  });

  it('Should return 400 if invalid suffix is provided', async () => {
    const { sut, suffixValidatorStub } = makeSut();
    jest.spyOn(suffixValidatorStub, 'isValid').mockReturnValueOnce(false);
    const httpRequest = {
      params: { suffix: 'invalid_suffix' },
    };
    const expected = badRequest(new InvalidParamError('Suffix'));
    const response = await sut.handle(httpRequest);
    expect(response).toEqual(expected);
  });

  it('Should call LoadURL with correct values', async () => {
    const { sut, loadURLStub } = makeSut();
    const addSpy = jest.spyOn(loadURLStub, 'load');
    const httpRequest = {
      params: { suffix: 'SuFfIx' },
    };
    await sut.handle(httpRequest);
    expect(addSpy).toHaveBeenCalledWith('SuFfIx');
  });
});
