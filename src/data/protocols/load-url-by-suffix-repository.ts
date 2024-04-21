import { URLModel } from '../../domain/models/url';

export interface LoadURLBySuffixRepository {
  load(suffix: string): Promise<URLModel | null>;
}
