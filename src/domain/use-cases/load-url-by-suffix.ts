import { URLModel } from '../models/url';

export interface LoadURLBySuffix {
  load(suffix: string): Promise<URLModel | null>;
}
