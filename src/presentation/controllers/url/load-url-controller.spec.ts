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
  const makeSut = (): { sut: LoadURLController; suffixValidatorStub: SuffixValidatorStub } => {
    const suffixValidatorStub = new SuffixValidatorStub();
    return {
      sut: new LoadURLController(suffixValidatorStub),
      suffixValidatorStub,
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
});
