import { Controller, HttpRequest, HttpResponse, SuffixValidator, LoadURLBySuffix } from './url-protocols';
import { badRequest, ok, serverError, notFound } from '../../helpers/http-helper';
import { MissingParamError, InvalidParamError } from '../../errors';

export class LoadURLController implements Controller {
  private readonly validator;
  private readonly loadURL: LoadURLBySuffix;

  constructor(validator: SuffixValidator, loadURLBySuffix: LoadURLBySuffix) {
    this.validator = validator;
    this.loadURL = loadURLBySuffix;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.params || !httpRequest.params.suffix) {
      return badRequest(new MissingParamError('Suffix'));
    }

    const valid = this.validator.isValid(httpRequest.params.suffix);
    if (!valid) return badRequest(new InvalidParamError('Suffix'));

    try {
      const loadedURL = await this.loadURL.load(httpRequest.params.suffix);
      if (loadedURL) return ok(loadedURL.originalURL);
      return notFound();
    } catch (error) {
      return serverError();
    }
  }
}
