import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import { AuthValidator, loginSchema } from '../validators/authValidator';

class AuthRoutes {
    router = Router();
    authController = new AuthController();
    authValidator = new AuthValidator();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.route('/login-user').post(this.authValidator.validateLogin(loginSchema), this.authController.LoginUser);
    }
}

export default new AuthRoutes().router;
