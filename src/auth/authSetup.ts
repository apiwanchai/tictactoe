// auth/[...nextauth].ts
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
      // อัปเดต token ถ้าผู้ใช้ล็อกอิน
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // เพิ่มข้อมูลใน session
      if (token) {
        session.id = token.id;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET, // ตรวจสอบให้แน่ใจว่ามีการตั้งค่า secret
  trustHost: true,
});
