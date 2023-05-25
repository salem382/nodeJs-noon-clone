"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const protectRoute_1 = require("../middleware/protectRoute");
const adresses_1 = __importDefault(require("../controlles/adresses"));
const addressesRouter = express_1.default.Router();
addressesRouter.route('/')
    .patch(protectRoute_1.protectRoute, (0, protectRoute_1.allowedTo)('customer'), adresses_1.default.addAdrees)
    .delete(protectRoute_1.protectRoute, (0, protectRoute_1.allowedTo)('customer'), adresses_1.default.removeAdress)
    .get(protectRoute_1.protectRoute, (0, protectRoute_1.allowedTo)('customer'), adresses_1.default.getAllAdresees);
exports.default = addressesRouter;
