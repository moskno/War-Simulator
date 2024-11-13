import { Request, Response } from 'express';

export const defences = (req: Request, res: Response) => {
  res.json({ message: 'Defences route is working!' });
};