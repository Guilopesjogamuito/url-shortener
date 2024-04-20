import { Router } from 'express';
import { makeUrlController } from '../factories/url';
import { adaptRoute } from '../adapters/express-routes-adapter';

export default (router: Router) => {
  const urlController = makeUrlController();
  const adapted = adaptRoute(urlController);
  router.post('/url', adapted);
};
