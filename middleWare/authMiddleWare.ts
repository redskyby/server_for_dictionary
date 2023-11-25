import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

interface User {
    userId: number;
    email: string;
    role: string;
    iat: number;
    exp: number;
}

declare module 'express' {
    interface Request {
        user?: User;
    }
}
export default function (req: Request, res: Response, next: NextFunction) {
    if (req.method === 'OPTIONS') {
        next();
    }
    try {
        const token: string = req.headers.authorization!.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Не авторизован!' });
        }
        req.user = jwt.verify(token, process.env.SECRET_KEY!) as User;
        next();
    } catch (e) {
        res.status(401).json({ message: 'Не авторизован!' });
    }
}
