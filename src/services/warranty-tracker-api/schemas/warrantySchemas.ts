import Joi from "joi";

export const createWarrantySchema = Joi.object({
    userId: Joi.string().required(),
    warranty: {
        productName: Joi.string().required().max(256),
        labels: [Joi.string().max(256)],
        startDate: Joi.date(),
        endDate: Joi.date(),
    },
});
