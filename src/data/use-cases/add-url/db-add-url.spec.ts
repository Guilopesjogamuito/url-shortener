import { URLModel, AddURLRepository, AddURLModel } from './db-add-url-protocols';
import { DbAddURL } from './db-add-url';

describe('DbAddURL Usecase', () => {
  const makeRepository = (): AddURLRepository => {
    class AddURLRepositoryStub implements AddURLRepository {
      add(urlObject: AddURLModel): Promise<URLModel> {
        const fakeURL = {
          originalURL: 'test',
          suffix: 'test',
          createdAt: new Date(),
          expiresAt: new Date(),
        };
        return new Promise((resolve) => resolve(fakeURL));
      }
    }
    return new AddURLRepositoryStub();
  };

  const makeSut = () => {
    const addURLRepositoryStub = makeRepository();
    const sut = new DbAddURL(addURLRepositoryStub);
    return { sut, addURLRepositoryStub };
  };

  it('Should call AddURLRepository with correct values', async () => {
    const { sut, addURLRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addURLRepositoryStub, 'add');

    const urlData = {
      originalURL: 'http://valid.com',
      suffix: 'SUFFIX',
    };
    await sut.add(urlData);
    expect(addSpy).toHaveBeenCalledWith({
      originalURL: 'http://valid.com',
      suffix: 'SUFFIX',
    });
  });

  it('Should throw if AddURLRepository throws', async () => {
    const { sut, addURLRepositoryStub } = makeSut();
    jest.spyOn(addURLRepositoryStub, 'add').mockReturnValueOnce(new Promise((_, reject) => reject(new Error())));

    const urlData = {
      originalURL: 'http://valid.com',
      suffix: 'SUFFIX',
    };
    const promise = sut.add(urlData);
    expect(promise).rejects.toThrow();
  });
});
