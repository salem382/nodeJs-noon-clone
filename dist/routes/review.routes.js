"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const review_1 = __importDefault(require("../controlles/review"));
const global_validation_1 = require("../validation/global.validation");
const validation_1 = __importDefault(require("../middleware/validation"));
const protectRoute_1 = require("../middleware/protectRoute");
const review_validation_1 = require("../validation/review.validation");
const reviewRouter = express_1.default.Router();
reviewRouter.route('/')
    .post(protectRoute_1.protectRoute, (0, protectRoute_1.allowedTo)('customer'), (0, validation_1.default)(review_validation_1.addReview), review_1.default.addReview)
    .get((0, validation_1.default)(review_validation_1.reviewId), review_1.default.getAllReview);
reviewRouter.route('/:id')
    .put(protectRoute_1.protectRoute, (0, protectRoute_1.allowedTo)('customer'), (0, validation_1.default)(review_validation_1.updateReview), review_1.default.updateReview)
    .delete(protectRoute_1.protectRoute, (0, protectRoute_1.allowedTo)('admin', 'customer'), (0, validation_1.default)(global_validation_1.idValidation), review_1.default.deleteReview)
    .get((0, validation_1.default)(global_validation_1.idValidation), review_1.default.getReview);
exports.default = reviewRouter;
