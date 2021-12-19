import prisma from '../db/db';
import { compare } from 'bcryptjs';
class TicketValidatorUser {
    constructor() { }
    async comparePassword(password, hash) {
        return await compare(password, hash);
    }
}

export default new TicketValidatorUser();