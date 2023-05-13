import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { Users, Admin } from "../../../databases";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {},
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied

                if (credentials?.admin) {
                    const { email, password } = credentials;

                    if (!email || !password) {
                        throw new Error("Missing username or password");
                    }

                    const user = await Admin.findOne({
                        where: { email },
                    });

                    if (!user || !(await compare(password, user.password))) {
                        throw new Error("Invalid username or password");
                    }
                    return { ...user, isAdmin: true };
                } else {
                    const { email, password } = credentials;

                    if (!email || !password) {
                        throw new Error("Missing username or password");
                    }

                    const user = await Users.findOne({
                        where: { email },
                    });

                    if (!user || !(await compare(password, user.password))) {
                        throw new Error("Invalid username or password");
                    }
                    return user;
                }
            },
        }),
    ],
    session: { strategy: "jwt" },
};

export default NextAuth(authOptions);
