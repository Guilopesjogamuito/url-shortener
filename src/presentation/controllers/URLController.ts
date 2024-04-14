import { HttpRequest, HttpResponse } from '../protocols/http';
import { Controller } from '../protocols/controller';
import { badRequest, ok } from '../helpers/http-helper';
import { MissingParamError } from '../errors/missing-param-error';

export class URLController implements Controller {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.url) {
      return badRequest(new MissingParamError('URL'));
    }
    return ok({});
  }
}
