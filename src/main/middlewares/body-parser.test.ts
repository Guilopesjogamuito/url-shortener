import request from 'supertest';
import app from '../config/app';

describe('Body Parser middleware', () => {
  it('Should use ', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body);
    });
    await request(app).post('/test_body_parser').send({ test: 'test' }).expect({ test: 'test' });
  });
});
