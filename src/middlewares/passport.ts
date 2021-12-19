
import { Strategy, ExtractJwt } from 'passport-jwt';
import { jwtSecret } from '../config';
import prisma from '../db/db';
import UsersRepository from '../repositories/UsersRepository';
import AuthRepository from '../repositories/AuthRepository';
import TicketValidatorUserRepository from '../repositories/TicketValidatorUserRepository';
import UserType from '../data/userType';
import { User, UserRole, TicketValidatorUser } from '@prisma/client';
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret
};
async function checkUserExists(id: string) {
    let user;
    user = await UsersRepository.getUserById(id);
    if (user) {
        user.userType = UserType.User;
        return user;
    }
    user = await TicketValidatorUserRepository.getTicketValidatorUserById(id);
    if (user) {
        user.userType = UserType.TicketValidatorUser;
        return user;
    }
    return user;

}
export default passport => {
    passport.use(new Strategy(options, async (payload, done) => {
        await checkUserExists(payload.id).then(async user => {
            // treat a locked out account as Unauthenticated
            if (user && !user.accountLockedOut) {
                return done(undefined, user);
            }
            return done(undefined, false);
        }).catch(err => {
            console.log(err);
            done(undefined, false);
        });
    }));
};