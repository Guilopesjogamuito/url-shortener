import { URLModel } from '../models/url';

export interface AddURLModel {
  originalURL: string;
  suffix: string;
}

export interface AddURL {
  add(urlObject: AddURLModel): URLModel;
}
