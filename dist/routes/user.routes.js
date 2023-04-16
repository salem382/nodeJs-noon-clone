"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../controlles/user"));
const global_validation_1 = require("../validation/global.validation");
const validation_1 = __importDefault(require("../middleware/validation"));
const userRouter = express_1.default.Router();
userRouter.route('/')
    .post(user_1.default.addUser)
    .get(user_1.default.getAllUsers);
userRouter.route('/:id')
    .put(user_1.default.updateUser)
    .delete((0, validation_1.default)(global_validation_1.idValidation), user_1.default.deleteUser)
    .get((0, validation_1.default)(global_validation_1.idValidation), user_1.default.getUser)
    .patch(user_1.default.changePassword);
exports.default = userRouter;
