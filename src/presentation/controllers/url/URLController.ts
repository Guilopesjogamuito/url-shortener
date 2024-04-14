import { Controller, HttpRequest, HttpResponse, SuffixCreator, AddURL } from './url-protocols';
import { badRequest, ok, serverError } from '../../helpers/http-helper';
import { MissingParamError, ServerError } from '../../errors';
import {} from '../../../domain/use-cases/add-url';

export class URLController implements Controller {
  private readonly suffixCreator: SuffixCreator;
  private readonly addUrl: AddURL;

  constructor(suffixCreator: SuffixCreator, addUrl: AddURL) {
    this.suffixCreator = suffixCreator;
    this.addUrl = addUrl;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.url) {
      return badRequest(new MissingParamError('URL'));
    }
    const suffix = this.suffixCreator.createSuffix();
    try {
      const addedURL = await this.addUrl.add({ originalURL: httpRequest.body.url, suffix });
      return ok(addedURL);
    } catch (error) {
      return serverError();
    }
  }
}
