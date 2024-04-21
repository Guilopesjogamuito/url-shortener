import { Router } from 'express';
import { makeAddUrlController, makeLoadUrlBySuffixController } from '../factories/url';
import { adaptRoute } from '../adapters/express-routes-adapter';

export default (router: Router) => {
  const addUrlController = makeAddUrlController();
  const loadURLController = makeLoadUrlBySuffixController();
  router.get('/:suffix', adaptRoute(loadURLController));
  router.post('/url', adaptRoute(addUrlController));
};
