import { URLModel } from '../../../domain/models/url';
import { MissingParamError } from '../../errors';
import { badRequest, serverError } from '../../helpers/http-helper';
import { AddURLController } from './add-url-controller';
import { SuffixCreator, AddURL, AddURLModel } from './url-protocols';

describe('AddURLController', () => {
  class SuffixCreatorStub implements SuffixCreator {
    createSuffix() {
      return 'SuFfIx';
    }
  }
  class AddURLStub implements AddURL {
    async add(addUrl: AddURLModel): Promise<URLModel> {
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

  const makeAddURL = (): AddURL => {
    return new AddURLStub();
  };

  const makeSut = (): { sut: AddURLController; suffixCreatorStub: SuffixCreatorStub; addURLStub: AddURLStub } => {
    const suffixCreatorStub = new SuffixCreatorStub();
    const addURLStub = makeAddURL();
    return {
      sut: new AddURLController(suffixCreatorStub, addURLStub),
      suffixCreatorStub: suffixCreatorStub,
      addURLStub: addURLStub,
    };
  };

  it('Should return 400 if no URL is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {},
    };
    const response = await sut.handle(httpRequest);
    const expected = badRequest(new MissingParamError('URL'));
    expect(response).toEqual(expected);
  });

  it('Should return 200 if URL is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: { url: 'http://g.com' },
    };
    const response = await sut.handle(httpRequest);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      originalURL: 'http://g.com',
      suffix: 'Suffix',
      createdAt: new Date(1),
      expiresAt: new Date(1),
    });
  });

  it('Should call AddURL with correct values', async () => {
    const { sut, suffixCreatorStub, addURLStub } = makeSut();
    const mockedSuffix = suffixCreatorStub.createSuffix();
    const addSpy = jest.spyOn(addURLStub, 'add');
    const httpRequest = {
      body: { url: 'http://g.com' },
    };
    await sut.handle(httpRequest);
    expect(addSpy).toHaveBeenCalledWith({ originalURL: httpRequest.body.url, suffix: mockedSuffix });
  });

  it('Should return 500 when add URL trows', async () => {
    const { sut, addURLStub } = makeSut();
    jest.spyOn(addURLStub, 'add').mockImplementationOnce(async () => {
      return new Promise((_, reject) => reject(new Error()));
    });
    const httpRequest = {
      body: { url: 'http://g.com' },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse).toEqual(serverError());
  });
});
