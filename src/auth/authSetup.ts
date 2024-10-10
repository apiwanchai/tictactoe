import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
  
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {

      if (token) {
        session.id = token.id;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET, 
});
