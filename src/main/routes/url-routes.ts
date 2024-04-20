import { Router } from 'express';

export default (router: Router) => {
  router.post('/url', (req, res) => {
    return res.json({ ok: 'ok' });
  });
};
