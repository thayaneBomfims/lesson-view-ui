import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async jwt({ token, account, profile }) {
            if (account && profile) {
                token.googleId = profile.sub; // ID único do Google
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.googleId = token.googleId;
            }
            return session;
        },
    },
});

export { handler as GET, handler as POST };
