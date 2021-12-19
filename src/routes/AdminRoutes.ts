import { Router } from 'express';
import AdminController from '../controllers/AdminController';
import AuthController from '../controllers/AuthController';
import { AdminValidator, registerTicketValidatorUserSchema, registerUserSchema } from '../validators/adminValidator';

class AdminRoutes {
    router = Router();
    adminController = new AdminController();
    adminValidator = new AdminValidator();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.route('/register-user').post(this.adminValidator.validateRegister(registerUserSchema), this.adminController.CreateUser);
        this.router.route('/register-user-schema').post(this.adminValidator.validateRegister(registerTicketValidatorUserSchema), this.adminController.CreateTicketValidatorUser);
    }
}

export default new AdminRoutes().router;
