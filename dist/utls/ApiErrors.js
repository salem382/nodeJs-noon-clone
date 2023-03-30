"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.catchError = exports.AppError = void 0;
class AppError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
exports.AppError = AppError;
const catchError = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => {
            next(new AppError(err.message, 500));
        });
    };
};
exports.catchError = catchError;
const errorHandler = (err, req, res, next) => {
    const statusCode = err.status || 500;
    return res.status(statusCode).json({ message: err.message });
};
exports.errorHandler = errorHandler;
