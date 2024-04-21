import { MongoHelper } from '../helpers/mongo-helper';
import { URLMongoRepository } from './url';
describe('URL Mongo Repository', () => {
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

  it('Should return an URL on creation success', async () => {
    const sut = new URLMongoRepository();
    const url = await sut.add({
      originalURL: 'test',
      suffix: 'test',
    });
    expect(url).toBeTruthy();
    expect(url.originalURL).toBe('test');
    expect(url.suffix).toBe('test');
    expect(url.createdAt).toBeTruthy();
    expect(url.expiresAt).toBeTruthy();
  });

  it('Should return null on load not found', async () => {
    const sut = new URLMongoRepository();
    const url = await sut.load('test');
    expect(url).toBeNull();
  });

  it('Should return an URL on load success', async () => {
    const sut = new URLMongoRepository();
    await sut.add({
      originalURL: 'test',
      suffix: 'suffix',
    });
    const url = await sut.load('suffix');
    expect(url).toBeTruthy();
    expect(url?.originalURL).toBe('test');
    expect(url?.suffix).toBe('suffix');
  });
});
