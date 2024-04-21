import { Controller, HttpRequest, HttpResponse } from './url-protocols';
import { badRequest, ok, serverError } from '../../helpers/http-helper';
import { MissingParamError, InvalidParamError } from '../../errors';
import { SuffixValidator } from '../../protocols/suffix-validator';

export class LoadURLController implements Controller {
  private readonly validator;

  constructor(validator: SuffixValidator) {
    this.validator = validator;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.params || !httpRequest.params.suffix) {
      return badRequest(new MissingParamError('Suffix'));
    }

    const valid = this.validator.isValid(httpRequest.params.suffix);
    if (!valid) return badRequest(new InvalidParamError('Suffix'));

    try {
      return ok({});
    } catch (error) {
      return serverError();
    }
  }
}
