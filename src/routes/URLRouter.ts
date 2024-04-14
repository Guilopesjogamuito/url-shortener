import express from 'express';
import { createURL } from '../controllers/URLController';

const router = express.Router();

router.post('/', createURL);

export default router;
