import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { promises as fs } from "fs";
import path from "path";

const usersPath = path.join(process.cwd(), "src", "app", "api", "auth", "users.json");

type User = {
  fullName: string;
  username: string;
  password: string;
  phone?: string;
};

async function getUsers(): Promise<User[]> {
  try {
    const file = await fs.readFile(usersPath, "utf8");
    return JSON.parse(file || "[]");
  } catch {
    return [];
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Tên đăng nhập", type: "text" },
        password: { label: "Mật khẩu", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const users = await getUsers();
        const user = users.find(
          (item) =>
            item.username === credentials.username &&
            item.password === credentials.password
        );

        if (!user) {
          return null;
        }

        return {
          id: user.username,
          name: user.fullName,
          username: user.username,
        };
      }
    })
  ],
  session: { strategy: "jwt" },
  secret: "secret_cua_ban_123",
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = (user as any).username;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).username = token.username as string;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };