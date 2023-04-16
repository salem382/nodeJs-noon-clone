import Joi from "joi";

export const addUser = Joi.object ({
    name:Joi.string().min(2).max(25).required(),
    email:Joi.string().email({ minDomainSegments: 3, tlds: { allow: ['com', 'net', 'boxmail'] } }).required(),
    password:Joi.string().required()
})
export const updateUser = Joi.object ({
    id:Joi.string().hex().length(24),
    name:Joi.string().min(2).max(25),
    email:Joi.string().email({ minDomainSegments: 3, tlds: { allow: ['com', 'net', 'boxmail'] } })
})