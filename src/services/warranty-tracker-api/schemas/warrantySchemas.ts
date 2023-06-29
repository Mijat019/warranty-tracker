import Joi from "joi";

export const createWarrantySchema = Joi.object({
    productName: Joi.string().required().max(256),
    labels: [Joi.string().max(256)],
    startDate: Joi.date(),
    endDate: Joi.date(),
});
