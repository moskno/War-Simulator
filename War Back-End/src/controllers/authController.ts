import { Request, Response } from 'express';

export const auth = (req: Request, res: Response) => {
  res.json({ message: 'Auth route is working!' });
};