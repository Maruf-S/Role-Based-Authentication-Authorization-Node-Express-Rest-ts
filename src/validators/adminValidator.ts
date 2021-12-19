import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

interface RegisterRequest extends Request {
    value?: { body?: string };
}
export class AdminValidator {
    constructor() { }

    validateRegister(schema) {
        return async (req: RegisterRequest, res: Response, next: NextFunction) => {
            try {
                const val = await schema.validateAsync(req.body);
                req.value = req.value ?? {};
                req.value.body = req.value.body ?? val;
                next();
            } catch (error) {
                res.status(400).json(error);
            }
        };
    }
}

export const registerUserSchema = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    phoneNumber: Joi.string().allow(undefined),
    address: Joi.string().allow(undefined),
    role: Joi.string().required(),
});

export const registerTicketValidatorUserSchema = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    address: Joi.string().allow(undefined),
});
