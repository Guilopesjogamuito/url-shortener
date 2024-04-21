import { Router } from 'express';
import { makeAddUrlController } from '../factories/url';
import { adaptRoute } from '../adapters/express-routes-adapter';

export default (router: Router) => {
  const urlController = makeAddUrlController();
  const adapted = adaptRoute(urlController);
  router.post('/url', adapted);
};
