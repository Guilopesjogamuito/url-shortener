import request from 'supertest';
import app from '../config/app';

describe('URL Routes', () => {
  it('Should return an URL on success ', async () => {
    await request(app)
      .post('/url')
      .send({
        url: 'https://google.com',
      })
      .expect(200);
  });
});
