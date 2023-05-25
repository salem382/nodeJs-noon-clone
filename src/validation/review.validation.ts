import Joi from "joi";

export const addReview = Joi.object ({
    comment:Joi.string().min(2).max(50).required(),
    user:Joi.string().hex().length(24).required(),
    product:Joi.string().hex().length(24).required(),
    rate:Joi.number().min(1).max(5).required()
})
export const updateReview  = Joi.object ({
    comment:Joi.string().min(2).max(50),
    user:Joi.string().hex().length(24),
    product:Joi.string().hex().length(24),
    rate:Joi.number().min(1).max(5),
    id:Joi.string().hex().length(24).required()
})

export const reviewId = Joi.object ({
    productId:Joi.string().hex().length(24).required()
});
