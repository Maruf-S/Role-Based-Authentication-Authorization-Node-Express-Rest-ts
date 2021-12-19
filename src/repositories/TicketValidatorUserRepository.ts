import prisma from '../db/db';
class TicketValidatorUserRepository {
    constructor() { }
    async getTicketValidatorUserById(id: string) {
        return await prisma?.ticketValidatorUser.findUnique({
            where: {
                id
            },
        });
    }
    async getTicketValidatorUserByEmail(email: string) {
        return await prisma?.ticketValidatorUser.findUnique({
            where: {
                normalizedEmail: email.toUpperCase()
            },
        });
    }
    async getTicketValidatorUserByPhoneNumber(phoneNumber: string) {
        return await prisma?.ticketValidatorUser.findUnique({
            where: {
                phoneNumber
            },
            include: {
                registeredBy: true
            }
        });
    }
    async createTicketValidator({ firstName, lastName, email, normalizedEmail, password, registrantId, phoneNumber, address }: { firstName: string, lastName: string, email: string, normalizedEmail: string, password: string, registrantId: string, phoneNumber: string, address: string | null }) {
        return await prisma?.ticketValidatorUser.create({
            data: {
                firstName,
                lastName,
                email,
                normalizedEmail,
                password,
                registrantId,
                phoneNumber,
                address
            },
        }
        );
    }
}

export default new TicketValidatorUserRepository();