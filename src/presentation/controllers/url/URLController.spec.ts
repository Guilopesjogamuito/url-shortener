import { MissingParamError } from '../../errors/missing-param-error';
import { badRequest, ok } from '../../helpers/http-helper';
import { URLController } from './URLController';
import { SuffixCreator, AddURL, AddURLModel } from './url-protocols';
describe('URLController', () => {
  class SuffixCreatorStub implements SuffixCreator {
    createSuffix() {
      return 'SuFfIx';
    }
  }
  class AddURLStub implements AddURL {
    add(addUrl: AddURLModel) {
      return {
        originalURL: 'http://g.com',
        suffix: 'Suffix',
        createdAt: new Date(),
        expiresAt: new Date(),
      };
    }
  }

  const makeSut = (): { sut: URLController; suffixCreatorStub: SuffixCreatorStub; addURLStub: AddURLStub } => {
    const suffixCreatorStub = new SuffixCreatorStub();
    const addURLStub = new AddURLStub();
    return {
      sut: new URLController(suffixCreatorStub, addURLStub),
      suffixCreatorStub: suffixCreatorStub,
      addURLStub: addURLStub,
    };
  };

  it('Should return 400 if no URL is provided', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {},
    };
    const response = sut.handle(httpRequest);
    const expected = badRequest(new MissingParamError('URL'));
    expect(response).toEqual(expected);
  });

  it('Should return 200 if URL is provided', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: { url: 'http://g.com' },
    };
    const response = sut.handle(httpRequest);
    const expected = ok({});
    expect(response).toEqual(expected);
  });

  it('Should call AddURL with correct values', () => {
    const { sut, suffixCreatorStub, addURLStub } = makeSut();
    const mockedSuffix = suffixCreatorStub.createSuffix();
    const addSpy = jest.spyOn(addURLStub, 'add');
    const httpRequest = {
      body: { url: 'http://g.com' },
    };
    sut.handle(httpRequest);
    expect(addSpy).toHaveBeenCalledWith({ originalURL: httpRequest.body.url, suffix: mockedSuffix });
  });
});
