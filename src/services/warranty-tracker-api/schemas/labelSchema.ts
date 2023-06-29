import Joi from "joi";

export const addLabelsSchema = Joi.object({
    labels: Joi.array().items(Joi.string()).required()
});

export const removeLabelsSchema = Joi.object({
    labels: Joi.array().items(Joi.string()).required()
}); 