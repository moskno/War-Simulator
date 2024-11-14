import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { CustomError } from "utils/errorHandler";

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "secret");
};

export const registerUser = async (
  username: string,
  password: string,
  organization: string,
  region?: string
) => {
  const userExists = await User.findOne({ username });
  if (userExists) {
    throw new CustomError("User already exists", 400);
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    password: hashedPassword,
    organization,
    region,
  });

  return {
    id: user.id,
    username: user.username,
    token: generateToken(user.id),
  };
};

export const loginUser = async (username: string, password: string) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new CustomError("Username not found", 400);
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new CustomError("Invalid password", 400);
  }
  return {
    id: user.id,
    username: user.username,
    token: generateToken(user.id),
  };
};
