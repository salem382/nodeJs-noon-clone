"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation = (schema) => {
    return (req, res, next) => {
        let inputs = Object.assign(Object.assign(Object.assign({}, req.body), req.params), req.query);
        const { error } = schema.validate(inputs, { abortEarly: false, details: true });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.json({ message: "error in validation", data: errors });
        }
        next();
    };
};
exports.default = validation;
