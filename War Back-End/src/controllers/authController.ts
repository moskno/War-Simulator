import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/authService";

export const register = async (req: Request, res: Response) => {
  const { username, password, organization, region } = req.body;
  try {
    const user = await registerUser(username, password, organization, region);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await loginUser(username, password);
    res.json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
