import Joi from "joi";

export const idValidation = Joi.object ({id
    :Joi.string().hex().length(24).required()
});
export const nameValidation = Joi.object ({
    name:Joi.string().min(2).max(25).required()
})
export const nameAndIdValidation = Joi.object ({
    name:Joi.string().min(2).max(25),
    id:Joi.string().hex().length(24).required()
})