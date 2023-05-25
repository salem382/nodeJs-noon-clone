"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config/config");
const allRoutes_1 = require("./allRoutes");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
(0, config_1.dbConnect)();
app.use((0, cors_1.default)());
app.use(express_1.default.static('uploads/'));
app.use(express_1.default.json());
(0, allRoutes_1.init)(app);
app.listen(5000, () => console.log('server is running'));
