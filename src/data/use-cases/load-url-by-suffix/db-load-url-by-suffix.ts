import { LoadURLBySuffix } from '../../../domain/use-cases/load-url-by-suffix';
import { URLModel } from '../add-url/db-add-url-protocols';
import { LoadURLBySuffixRepository } from './db-load-url-by-suffix-protocols';

export class DbLoadURLBySuffix implements LoadURLBySuffix {
  private readonly repository: LoadURLBySuffixRepository;

  constructor(repository: LoadURLBySuffixRepository) {
    this.repository = repository;
  }

  async load(suffix: string): Promise<URLModel | null> {
    const loadedURL = await this.repository.load(suffix);

    if (loadedURL) return new Promise((resolve) => resolve(loadedURL));
    return new Promise((resolve) => resolve(null));
  }
}
