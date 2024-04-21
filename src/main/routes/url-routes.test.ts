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

  it('Should return 400 for invalid length', async () => {
    await request(app).get('/ABCDaaE').expect(400);
  });

  it('Should return 404 for suffix not found', async () => {
    await request(app).get('/ABCDE').expect(404);
  });

  it('Should return 200 for suffix found', async () => {
    const response = await request(app).post('/url').send({ url: 'g.com' });
    const { suffix } = response.body;
    await request(app).get(`/${suffix}`).expect(200);
  });
});
