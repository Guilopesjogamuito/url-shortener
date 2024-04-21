import { AddURLRepository } from '../../../../data/protocols/add-url-repository';
import { AddURLModel } from '../../../../domain/use-cases/add-url';
import { URLModel } from '../../../../domain/models/url';
import { MongoHelper } from '../helpers/mongo-helper';
import { LoadURLBySuffixRepository } from '../../../../data/protocols/load-url-by-suffix-repository';

export class URLMongoRepository implements AddURLRepository, LoadURLBySuffixRepository {
  async add(urlObject: AddURLModel): Promise<URLModel> {
    const urlCollection = MongoHelper.getCollection('urls');
    const doc = { ...urlObject, createdAt: new Date(), expiresAt: new Date() };
    await urlCollection.insertOne(doc);
    return doc;
  }

  async load(suffix: string): Promise<URLModel | null> {
    const urlCollection = MongoHelper.getCollection('urls');
    const foundDoc = await urlCollection.findOne({ suffix });
    if (foundDoc) {
      const model: URLModel = {
        originalURL: foundDoc.originalURL,
        suffix: foundDoc.suffix,
        createdAt: foundDoc.createdAt,
        expiresAt: foundDoc.expiresAt,
      };
      return model;
    }
    return null;
  }
}
