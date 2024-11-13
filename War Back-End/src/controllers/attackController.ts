import { Request, Response } from 'express';

export const attacks = (req: Request, res: Response) => {
  res.json({ message: 'Attacks route is working!' });
};
