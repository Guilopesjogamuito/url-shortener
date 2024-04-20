import { AddURLRepository } from '../../../../data/protocols/add-url-repository';
import { AddURLModel } from '../../../../domain/use-cases/add-url';
import { URLModel } from '../../../../domain/models/url';
import { MongoHelper } from '../helpers/mongo-helper';

export class URLMongoRepository implements AddURLRepository {
  async add(urlObject: AddURLModel): Promise<URLModel> {
    const urlCollection = MongoHelper.getCollection('urls');
    const doc = { ...urlObject, createdAt: new Date(), expiresAt: new Date() };
    await urlCollection.insertOne(doc);
    return doc;
  }
}
