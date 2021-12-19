import { Request, Response, NextFunction } from 'express';
// import CourseRepo from './../repositories/CoursesRepo';
import { apiErrorHandler } from '../handlers/errorHandler';
import { sign } from 'jsonwebtoken';
import * as moment from 'moment';
import AuthRepository from '../repositories/AuthRepository';
import { jwtSecret } from '../config';
import { hashPassword } from '../utils/auth';
import UsersRepository from '../repositories/UsersRepository';
import TicketValidatorUserRepository from '../repositories/TicketValidatorUserRepository';
export default class AdminController {
    constructor() { }

    async CreateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { firstName, lastName, email, password, phoneNumber, role, address }: { role: number, firstName: string, lastName: string, email: string, password: string, phoneNumber: string | null, address: string | null } = req.body;
            const emailTaken = await UsersRepository.getUserByEmail(email);
            if (emailTaken) {
                return res.status(409).json({
                    error: 'This email already belongs to an account.'
                });
            }
            const phoneNumberTaken = await UsersRepository.getUserByPhoneNumber(phoneNumber || '');
            if (phoneNumberTaken) {
                return res.status(409).json({
                    error: 'This phone number already belongs to an account.'
                });
            }
            const user = await UsersRepository.createUser({ firstName, lastName, email, normalizedEmail: email.toUpperCase(), password: await hashPassword(password), phoneNumber: phoneNumber, role, registrantId: (req.user as any).id, address });
            return res.status(201).json({
                error: undefined,
                message: 'User created successfully'
            });

        } catch (error) {
            return apiErrorHandler(error, req, res, 'User couldn\'t be created.');
        }
    }
    async CreateTicketValidatorUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { firstName, lastName, email, password, phoneNumber, address }: { firstName: string, lastName: string, email: string, password: string, phoneNumber: string, address: string | null } = req.body;
            const emailTaken = await TicketValidatorUserRepository.getTicketValidatorUserByEmail(email);
            if (emailTaken) {
                return res.status(409).json({
                    error: 'This email already belongs to an account.'
                });
            }
            const phoneNumberTaken = await TicketValidatorUserRepository.getTicketValidatorUserByPhoneNumber(phoneNumber);
            if (phoneNumberTaken) {
                return res.status(409).json({
                    error: 'This phone number already belongs to an account.'
                });
            }
            const user = await TicketValidatorUserRepository.createTicketValidator({ firstName, lastName, email, normalizedEmail: email.toUpperCase(), password: await hashPassword(password), phoneNumber: phoneNumber, registrantId: (req.user as any).id, address });
            return res.status(201).json({
                error: undefined,
                message: 'User created successfully'
            });

        } catch (error) {
            return apiErrorHandler(error, req, res, 'Ticket Validator User couldn\'t be created.');
        }
    }
}
