import { ErrorRequestHandler } from 'express';

export class AppError extends Error {
    status:any;
    constructor(message:any, status:any) {
        super(message);
        this.status = status;
    }
}

export const catchError = (fn:any) => {

    return (req:any , res:any , next: any) => {
        fn(req, res, next).catch((err:any) => {

            next(new AppError(err.message, 500));
        })
    }
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    const statusCode = err.status || 500
    return res.status(statusCode).json({ message: err.message });
};
