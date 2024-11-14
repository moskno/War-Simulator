import { Request, Response } from "express";

export class CustomError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const handleError = (res: Response, error: Error) => {
    if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal Server Error"})
}