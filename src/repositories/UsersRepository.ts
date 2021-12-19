import prisma from '../db/db';
import { compare } from 'bcryptjs';
class UsersRepository {
    constructor() { }
    async getUserById(id: string) {
        return await prisma?.user.findUnique({
            where: {
                id
            },
            include: {
                roles: true,
                registeredBy: true
            },
        });
    }
    async getUserByEmail(email: string) {
        return await prisma?.user.findUnique({
            where: {
                normalizedEmail: email.toUpperCase()
            },
            include: {
                roles: true,
                registeredBy: true
            }
        });
    }
    async getUserByPhoneNumber(phoneNumber: string) {
        return await prisma?.user.findFirst({
            where: {
                phoneNumber
            },
            include: {
                roles: true,
                registeredBy: true
            }
        });
    }
    async createUser({ firstName, lastName, email, normalizedEmail, password, registrantId, phoneNumber, role, address }: { role: number, firstName: string, lastName: string, email: string, normalizedEmail: string, password: string, registrantId: string, phoneNumber: string | null, address: string | null }) {
        return await prisma?.user.create({
            data: {
                firstName,
                lastName,
                email,
                normalizedEmail,
                password,
                registrantId,
                userRoleId: role,
                phoneNumber,
                address
            },
            include: {
                roles: true
            }
        }
        );
    }
}

export default new UsersRepository();