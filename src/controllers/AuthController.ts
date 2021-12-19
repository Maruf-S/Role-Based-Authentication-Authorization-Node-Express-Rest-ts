import { Request, Response, NextFunction } from 'express';
// import CourseRepo from './../repositories/CoursesRepo';
import { apiErrorHandler } from '../handlers/errorHandler';
import { sign } from 'jsonwebtoken';
import * as moment from 'moment';
import AuthRepository from '../repositories/AuthRepository';
import { jwtSecret } from '../config';
import UsersRepository from '../repositories/UsersRepository';
export default class AuthController {
    constructor() { }

    async LoginUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const user = await UsersRepository.getUserByEmail(email);
            if (!user || !await AuthRepository.comparePassword(password, user.password)) {
                return res.status(401).json({ error: 'Invalid Credentials!' });
            }
            else {
                const token = sign(
                    {
                        id: user.id,
                        role: user.roles,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email
                    }, jwtSecret!, { expiresIn: '7 days' }
                );
                const result = {
                    token: `Bearer ${token}`,
                    expiryDate: moment().add(168, 'hours')
                };
                return res.status(200).json({
                    ...result,
                    error: undefined
                });
            }
        } catch (error) {
            return apiErrorHandler(error, req, res, 'Login failed.');
        }
    }

    // async getCourseDetails(req: Request, res: Response, next: NextFunction) {
    //   try {
    //     const courseDetails = await CourseRepo.getById(req.params.id);
    //     if (courseDetails) {
    //       return res.json(courseDetails);
    //     } else {
    //       res.status(404).send(`Lesson ${req.params.id} not found.`);
    //     }
    //   } catch (error) {
    //     apiErrorHandler(error, req, res, `Course ${req.params.id} is failed.`);
    //   }
    // }
}
