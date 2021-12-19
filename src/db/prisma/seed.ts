import Roles from '../../data/roles';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../../utils/auth/index';
const prisma = new PrismaClient();
const rolesList = [Roles.Admin];
async function checkRoleExists(roleName: string) {
  const role = await prisma.userRole.findFirst({ where: { name: roleName } });
  if (role) return true;
  return false;
}
async function checkUserExists(normalizedEmail: string) {
  const user = await prisma.user.findFirst({
    where: {
      normalizedEmail: normalizedEmail
    }
  });
  if (user) return true;
  else return false;
}
async function seedRoles() {
  rolesList.forEach(async role => {
    if (!(await checkRoleExists(role))) {
      await prisma.userRole.create({
        data: {
          name: role,
        }
      });
    }
  });
  console.log('Finished seeding roles');
}
async function seedSuperUser() {
  const adminRole = await prisma.userRole.findFirst({
    where: {
      name: Roles.Admin
    }
  });
  if (!adminRole) {
    console.log("The role doesn't exist.");
    return false;
  }
  if (!(await checkUserExists('SUPERUSER'))) {
    const superUser = await prisma.user.create({
      data: {
        firstName: 'SuperUser',
        lastName: 'SuperUser',
        email: 'SuperUser',
        normalizedEmail: 'SUPERUSER',
        emailConfirmed: true,
        password: await hashPassword('123456'),
        address: "adress example",
        roles: {
          connect: {
            id: adminRole.id
          }
        }
      }
    });

  }
  else {
    console.log('SuperUser already exists.');
  }
  console.log('Finished seeding users.');
}
async function main() {
  await seedRoles();
  await seedSuperUser();

}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });