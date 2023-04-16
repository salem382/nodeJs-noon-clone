"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUpload = exports.validation_object = void 0;
const uuid_1 = require("uuid");
const multer_1 = __importDefault(require("multer"));
const ApiErrors_1 = require("../utls/ApiErrors");
exports.validation_object = {
    image: ['image/jpeg', 'image/png'],
    files: ['application/pdf']
};
const fileUpload = (customValidation, path) => {
    const storage = multer_1.default.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `uploads/${path}`);
        },
        filename: function (req, file, cb) {
            cb(null, (0, uuid_1.v4)() + file.originalname);
        }
    });
    function fileFilter(req, file, cb) {
        if (customValidation.includes(file.mimetype))
            return cb(null, true);
        cb(new ApiErrors_1.AppError('invalid extension', 400), false);
    }
    const upload = (0, multer_1.default)({ storage: storage, fileFilter });
    return upload;
};
exports.fileUpload = fileUpload;
