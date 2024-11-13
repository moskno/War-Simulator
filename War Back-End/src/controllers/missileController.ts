import { Request, Response } from 'express';

export const missiles = (req: Request, res: Response) => {
  res.json({ message: 'Missiles route is working!' });
};