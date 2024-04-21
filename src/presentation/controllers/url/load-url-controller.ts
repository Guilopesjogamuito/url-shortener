import { Controller, HttpRequest, HttpResponse } from './url-protocols';
import { badRequest, ok, serverError } from '../../helpers/http-helper';
import { MissingParamError } from '../../errors';

export class LoadURLController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.params || !httpRequest.params.suffix) {
      return badRequest(new MissingParamError('Suffix'));
    }

    try {
      return ok({});
    } catch (error) {
      return serverError();
    }
  }
}
