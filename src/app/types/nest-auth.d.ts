import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id?: string;
            googleId?: string; // adicionamos aqui
        } & DefaultSession["user"];
    }

    interface User extends DefaultUser {
        googleId?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        googleId?: string;
    }
}
