import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.");
        }

        // Lấy danh sách users từ bộ nhớ RAM toàn cục (đã đồng bộ với bên Register)
        const users = (global as any).globalUsers || [];

        // Tìm xem tài khoản có tồn tại và khớp mật khẩu không
        const user = users.find(
          (u: any) =>
            u.username === credentials.username && u.password === credentials.password
        );

        // Nếu tìm thấy tài khoản hợp lệ, trả về thông tin để NextAuth xử lý session
        if (user) {
          return {
            id: user.username,
            name: user.fullName,
            email: user.username,
          };
        }

        // Nếu sai thông tin, ném ra thông báo lỗi hiển thị lên giao diện công cộng
        throw new Error("Tên đăng nhập hoặc mật khẩu không chính xác!");
      },
    }),
  ],
  pages: {
    signIn: "/login", // Đường dẫn trang đăng nhập của bạn
  },
  session: {
    strategy: "jwt" as const,
  },
  secret: process.env.NEXTAUTH_SECRET || "bi_mat_sieu_bao_mat_cua_massimo_restaurant",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };