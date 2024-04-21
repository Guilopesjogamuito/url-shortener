import { URLModel, LoadURLBySuffixRepository } from './db-load-url-by-suffix-protocols';
import { DbLoadURLBySuffix } from './db-load-url-by-suffix';

describe('DbLoadURLBySuffix Usecase', () => {
  const makeRepository = (): LoadURLBySuffixRepository => {
    class LoadURLBySuffixRepositoryStub implements LoadURLBySuffixRepository {
      load(suffix: string): Promise<URLModel> {
        const fakeURL = {
          originalURL: 'test',
          suffix: 'test',
          createdAt: new Date(),
          expiresAt: new Date(),
        };
        return new Promise((resolve) => resolve(fakeURL));
      }
    }
    return new LoadURLBySuffixRepositoryStub();
  };

  const makeSut = () => {
    const repository = makeRepository();
    return { sut: new DbLoadURLBySuffix(repository), loadURLBySuffixRepositoryStub: repository };
  };

  it('Should call LoadURLBySuffixRepository with correct values', async () => {
    const { sut, loadURLBySuffixRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(loadURLBySuffixRepositoryStub, 'load');

    await sut.load('SUFFIX');
    expect(addSpy).toHaveBeenCalledWith('SUFFIX');
  });

  it('Should throw if LoadURLBySuffixRepository throws', async () => {
    const { sut, loadURLBySuffixRepositoryStub } = makeSut();
    jest
      .spyOn(loadURLBySuffixRepositoryStub, 'load')
      .mockReturnValueOnce(new Promise((_, reject) => reject(new Error())));

    const promise = sut.load('Suffix');
    expect(promise).rejects.toThrow();
  });
});
