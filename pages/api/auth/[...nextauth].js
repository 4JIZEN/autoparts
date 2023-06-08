import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { Users } from "../../../databases";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {},
            async authorize(credentials, req) {
                if (credentials) {
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
                    return { ...user };
                }
            },
        }),
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            user && (token.user = user);
            return token;
        },
        session: async ({ session, token }) => {
            session.user = token.user.dataValues; // Setting token in session
            return session;
        },
    },
};

export default NextAuth(authOptions);
