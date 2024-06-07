import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';
import dotenv from 'dotenv';
dotenv.config();

export const verifyToken = (req, res, next) => {
    const token = req.header("Authorization")

    if (!token) {
        return res.status(400).json({
            success: false,
            message: "Token missing",
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: "Token expired",
            });
        }
        req.user = user;
        next();
    });
};