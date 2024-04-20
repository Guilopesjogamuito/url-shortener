import { Express, Router } from 'express';
import urlRouter from '../routes/url-routes';
export default (app: Express) => {
  const router = Router();
  app.use('/', router);
  urlRouter(router);
};
