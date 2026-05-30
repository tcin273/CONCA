import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { promises as fs } from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import { createClient } from "@supabase/supabase-js";

const usersPath = path.join(process.cwd(), "src", "app", "api", "auth", "users.json");

type User = {
  fullName: string;
  username: string;
  password: string;
  phone?: string;
};

async function getUsers(): Promise<User[]> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;
  const useSupabase = Boolean(supabaseUrl && supabaseKey);
  const supabase = useSupabase ? createClient(supabaseUrl as string, supabaseKey as string) : null;

  let fileUsers: User[] = [];
  try {
    const file = await fs.readFile(usersPath, "utf8");
    fileUsers = JSON.parse(file || "[]");
  } catch {
    fileUsers = [];
  }

  const g: any = global as any;
  const globalUsers: User[] = g.globalUsers || [];

  if (useSupabase && supabase) {
    try {
      const { data } = await supabase.from<"users", any>("users").select("*");
      const supaUsers = data || [];
      const map = new Map<string, User>();
      fileUsers.forEach((u) => map.set(u.username, u));
      globalUsers.forEach((u) => map.set(u.username, u));
      supaUsers.forEach((u) => map.set(u.username, u));
      return Array.from(map.values());
    } catch {
      const map = new Map<string, User>();
      fileUsers.forEach((u) => map.set(u.username, u));
      globalUsers.forEach((u) => map.set(u.username, u));
      return Array.from(map.values());
    }
  }

  const map = new Map<string, User>();
  fileUsers.forEach((u) => map.set(u.username, u));
  globalUsers.forEach((u) => map.set(u.username, u));
  return Array.from(map.values());
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
        const candidate = users.find((item) => item.username === credentials.username);
        if (!candidate) return null;

        const stored = candidate.password || "";
        let ok = false;
        try {
          if (stored.startsWith("$2")) {
            ok = await bcrypt.compare(credentials.password, stored);
          } else {
            // legacy plain-text fallback
            ok = stored === credentials.password;
          }
        } catch {
          ok = false;
        }

        if (!ok) return null;

        return {
          id: candidate.username,
          name: candidate.fullName,
          username: candidate.username,
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