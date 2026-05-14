import { hash } from "crypto";
import { prisma } from "./client";
import { hashPassword } from "services/user-service";
import { ACCOUNT_TYPE } from "./constant";
import { name } from "ejs";
const initDatabase = async () => {
    const countUsers = await prisma.user.count();
    const countRoles = await prisma.role.count();
    const defaultPassword = await hashPassword("123456");

    if (countRoles === 0) {
        await prisma.role.createMany({
            data: [
                {
                    name: "Admin",
                    description: "Administrator user"
                },
                {
                    name: "User",
                    description: "Regular user"
                }
            ]
        });
    } else if (countUsers === 0) {
        const adminRole = await prisma.role.findFirst({
            where: { name: "Admin" }
        })
        if (adminRole) {
            await prisma.user.createMany({
                data: [
                    {
                        fullName: "Pham Khanh Ly",
                        username: "lykhanhpham@gmail.com",
                        password: defaultPassword,
                        accountType: ACCOUNT_TYPE.SYSTEM,
                        roleId: adminRole.id
                    },
                    {
                        fullName: "Admin",
                        username: "admin@gmail.com",
                        password: defaultPassword,
                        accountType: ACCOUNT_TYPE.SYSTEM,
                        roleId: adminRole.id
                    }
                ]
            });
        }
    }
    else {
        console.log("Database already seeded");
    }
};
export default initDatabase;