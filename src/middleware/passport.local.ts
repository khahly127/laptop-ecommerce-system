import { prisma } from "config/client";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserWithRoleById } from "services/client/auth.service";
import { comparePassword } from "services/user-service";

const configPassPortLocal = () => {
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, async function verify(req, username, password, callback) {
        try {
            const { session } = req as any;
            if (session?.messages?.length) {
                session.messages = [];
            }
            const user = await prisma.user.findUnique({
                where: { username }
            });

            if (!user) {
                return callback(null, false, { message: `Username: ${username} not found` });
            }

            const isMatch = await comparePassword(password, user.password);

            if (!isMatch) {
                return callback(null, false, { message: "Invalid password" });
            }

            return callback(null, user as any);
        } catch (error) {
            return callback(error);
        }
    }));

    passport.serializeUser(function (user: any, callback) {
        callback(null, { id: user.id, username: user.username })
    });

    passport.deserializeUser(async function (user: any, callback) {
        const { id, username } = user;
        // query to database
        const userInDB = await getUserWithRoleById(id);
        return callback(null, { ...userInDB });
    });
}
export { configPassPortLocal };