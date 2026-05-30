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
          throw new Error("Vui lòng điền đầy đủ tên đăng nhập và mật khẩu.");
        }

        // Lấy danh sách users trực tiếp từ bộ nhớ RAM toàn cục (đã được đồng bộ từ file Register)
        const users = (global as any).globalUsers || [];

        // Tìm kiếm xem tài khoản có tồn tại và khớp mật khẩu không
        const user = users.find(
          (u: any) =>
            u.username === credentials.username && u.password === credentials.password
        );

        // Nếu tìm thấy user hợp lệ, trả về object để NextAuth tiến hành tạo session login
        if (user) {
          return {
            id: user.username,
            name: user.fullName,
            email: user.username,
          };
        }

        // Nếu không tìm thấy hoặc sai mật khẩu, trả về thông báo lỗi cho Frontend hiển thị
        throw new Error("Tên đăng nhập hoặc mật khẩu không chính xác!");
      },
    }),
  ],
  pages: {
    signIn: "/auth", // Đường dẫn trang giao diện Đăng nhập/Đăng ký của bạn
  },
  session: {
    strategy: "jwt" as const,
  },
  // Chuỗi khóa bảo mật chạy tạm trên Vercel để tránh lỗi thiếu NEXTAUTH_SECRET (.env)
  secret: process.env.NEXTAUTH_SECRET || "chuoi_khoa_bao_mat_cua_rieng_massimo_restaurant_123",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };