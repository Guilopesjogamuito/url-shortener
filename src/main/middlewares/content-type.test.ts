import request from 'supertest';
import app from '../config/app';

describe('Content-Type middleware', () => {
  it('Should use ', async () => {
    app.get('/test_content_type', (req, res) => {
      res.send('');
    });
    await request(app).get('/test_content_type').expect('content-type', /json/);
  });
});
