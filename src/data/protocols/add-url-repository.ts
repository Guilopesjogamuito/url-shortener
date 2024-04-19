import { AddURLModel } from '../../domain/use-cases/add-url';
import { URLModel } from '../../domain/models/url';

export interface AddURLRepository {
  add(urlObject: AddURLModel): Promise<URLModel>;
}
