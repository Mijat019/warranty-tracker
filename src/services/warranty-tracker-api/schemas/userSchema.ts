import Joi from "joi";

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(64)
})

export const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(64)
})