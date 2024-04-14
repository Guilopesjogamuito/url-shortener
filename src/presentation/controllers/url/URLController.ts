import { Controller, HttpRequest, HttpResponse, SuffixCreator, AddURL } from './url-protocols';
import { badRequest, ok } from '../../helpers/http-helper';
import { MissingParamError } from '../../errors/missing-param-error';
import {} from '../../../domain/use-cases/add-url';

export class URLController implements Controller {
  private readonly suffixCreator: SuffixCreator;
  private readonly addUrl: AddURL;

  constructor(suffixCreator: SuffixCreator, addUrl: AddURL) {
    this.suffixCreator = suffixCreator;
    this.addUrl = addUrl;
  }

  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.url) {
      return badRequest(new MissingParamError('URL'));
    }
    const suffix = this.suffixCreator.createSuffix();
    this.addUrl.add({ originalURL: httpRequest.body.url, suffix });
    return ok({});
  }
}
