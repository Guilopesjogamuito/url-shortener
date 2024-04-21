import { MissingParamError } from '../../errors';
import { badRequest } from '../../helpers/http-helper';
import { LoadURLController } from './load-url-controller';

describe('LoadURLController', () => {
  const makeSut = (): { sut: LoadURLController } => {
    return {
      sut: new LoadURLController(),
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
});
