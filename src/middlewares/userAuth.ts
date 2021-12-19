import * as passport from 'passport';

/**
 * @DESC General User Authentication
 */
const userAuth = passport.authenticate('jwt', { session: false });
export default userAuth;