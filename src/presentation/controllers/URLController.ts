import { HttpRequest, HttpResponse } from '../protocols/http';
import { Controller } from '../protocols/controller';
import { badRequest, ok } from '../helpers/http-helper';
import { MissingParamError } from '../errors/missing-param-error';
import { SuffixCreator } from '../protocols/suffix-creator';

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
