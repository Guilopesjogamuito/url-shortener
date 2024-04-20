import request from 'supertest';
import app from '../config/app';
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper';

describe('URL Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string);
  });
  afterAll(async () => {
    await MongoHelper.disconnect();
  });
  beforeEach(async () => {
    const urlCollection = MongoHelper.getCollection('urls');
    await urlCollection.deleteMany({});
  });
  it('Should return an URL on success ', async () => {
    await request(app)
      .post('/url')
      .send({
        url: 'https://google.com',
      })
      .expect(200);
  });
});
