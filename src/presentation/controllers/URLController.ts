import { Controller, HttpRequest, HttpResponse, SuffixCreator } from '../protocols';
import { badRequest, ok } from '../helpers/http-helper';
import { MissingParamError } from '../errors/missing-param-error';

export class URLController implements Controller {
  private readonly suffixCreator: SuffixCreator;

  constructor(suffixCreator: SuffixCreator) {
    this.suffixCreator = suffixCreator;
  }

  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.url) {
      return badRequest(new MissingParamError('URL'));
    }
    const suffix = this.suffixCreator.createSuffix();

    return ok({});
  }
}
