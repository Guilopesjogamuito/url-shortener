import { MissingParamError } from '../errors/missing-param-error';
import { badRequest } from '../helpers/http-helper';
import { URLController } from './URLController';

describe('URLController', () => {
  it('Should return 400 if no URL is provided', () => {
    const sut = new URLController();
    const httpRequest = {
      body: {},
    };
    const response = sut.handle(httpRequest);
    const expected = badRequest(new MissingParamError('URL'));
    expect(response).toEqual(expected);
  });
});
