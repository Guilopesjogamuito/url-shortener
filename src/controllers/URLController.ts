import { Request, Response } from 'express';
import URL from '../models/URL';

const generateSuffix = () => {
  const possibleChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let suffix = '';
  for (let i = 0; i < 5; i++) {
    let rand = Math.floor(Math.random() * possibleChars.length);
    suffix += possibleChars[rand];
  }
  return suffix;
};

export const createURL = async (req: Request, res: Response): Promise<void> => {
  try {
    const { url } = req.body;

    if (!url) {
      res.status(400).json({ message: 'URL is required' });
      return;
    }
    const suffix = generateSuffix();
    const newURL = await URL.create({ suffix, originalUrl: url });
    res.status(201).json({ url: newURL });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
