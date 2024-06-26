import { URLModel, AddURL, AddURLModel, AddURLRepository } from './db-add-url-protocols';

export class DbAddURL implements AddURL {
  private readonly repository;

  constructor(repository: AddURLRepository) {
    this.repository = repository;
  }

  async add(urlObject: AddURLModel): Promise<URLModel> {
    const addedURL = await this.repository.add(urlObject);
    return new Promise((resolve) => resolve(addedURL));
  }
}
