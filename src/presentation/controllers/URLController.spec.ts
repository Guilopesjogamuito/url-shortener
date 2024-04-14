import { MissingParamError } from '../errors/missing-param-error';
import { badRequest, ok } from '../helpers/http-helper';
import { URLController } from './URLController';
import { SuffixCreator } from '../protocols';

describe('URLController', () => {
  const makeSut = (): URLController => {
    class SuffixCreatorStub implements SuffixCreator {
      createSuffix() {
        return 'SuFfIx';
      }
    }
    return new URLController(new SuffixCreatorStub());
  };

  it('Should return 400 if no URL is provided', () => {
    const sut = makeSut();
    const httpRequest = {
      body: {},
    };
    const response = sut.handle(httpRequest);
    const expected = badRequest(new MissingParamError('URL'));
    expect(response).toEqual(expected);
  });

  it('Should return 200 if URL is provided', () => {
    const sut = makeSut();
    const httpRequest = {
      body: { url: 'http://g.com' },
    };
    const response = sut.handle(httpRequest);
    const expected = ok({});
    expect(response).toEqual(expected);
  });
});
