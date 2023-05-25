"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../controlles/user"));
const global_validation_1 = require("../validation/global.validation");
const validation_1 = __importDefault(require("../middleware/validation"));
const fileUploads_1 = require("../middleware/fileUploads");
const protectRoute_1 = require("../middleware/protectRoute");
const userRouter = express_1.default.Router();
userRouter.route('/')
    .post(protectRoute_1.protectRoute, (0, protectRoute_1.allowedTo)('admin'), (0, fileUploads_1.fileUpload)(fileUploads_1.validation_object.image, 'user').single('image'), user_1.default.addUser)
    .get(protectRoute_1.protectRoute, (0, protectRoute_1.allowedTo)('admin'), user_1.default.getAllUsers);
userRouter.route('/:id')
    .put(protectRoute_1.protectRoute, (0, protectRoute_1.allowedTo)('admin'), (0, fileUploads_1.fileUpload)(fileUploads_1.validation_object.image, 'user').single('image'), user_1.default.updateUser)
    .delete(protectRoute_1.protectRoute, (0, protectRoute_1.allowedTo)('admin'), (0, validation_1.default)(global_validation_1.idValidation), user_1.default.deleteUser)
    .get(protectRoute_1.protectRoute, (0, protectRoute_1.allowedTo)('admin'), (0, validation_1.default)(global_validation_1.idValidation), user_1.default.getUser)
    .patch(protectRoute_1.protectRoute, (0, protectRoute_1.allowedTo)('admin'), user_1.default.changePassword);
exports.default = userRouter;
