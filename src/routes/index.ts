import { Application } from 'express';
import AuthRoutes from './AuthRoutes';
// import lessonRouter from './LessonRoutes';
import userAuth from '../middlewares/userAuth';
import userTypeAuth from '../middlewares/userTypeAuth';
import userRoleAuth from '../middlewares/userRoleAuth';
import UserType from '../data/userType';
import Roles from '../data/roles';
export default class Routes {

  constructor(app: Application) {
    app.use('/api/auth', userAuth, userTypeAuth(UserType.User), AuthRoutes);
    app.use('/api/admin', userAuth, userTypeAuth(UserType.User), userRoleAuth([Roles.Admin]), AuthRoutes);
    // lesson routes
    // app.use('/api/lessons', lessonRouter);
  }
}
