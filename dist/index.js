"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config/config");
const app = (0, express_1.default)();
(0, config_1.dbConnect)();
app.get('/', (req, res) => {
    return res.json('success');
});
app.listen('5000', () => console.log('server is running'));
