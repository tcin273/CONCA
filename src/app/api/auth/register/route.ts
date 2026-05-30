import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const usersPath = path.join(process.cwd(), "src", "app", "api", "auth", "users.json");

type User = {
  fullName: string;
  username: string;
  password: string;
  phone?: string;
};

export async function POST(request: Request) {
  const body = await request.json();
  const { fullName, username, password, phone } = body;

  if (!fullName || !username || !password) {
    return NextResponse.json(
      { message: "Vui lòng điền đầy đủ họ tên, tên đăng nhập và mật khẩu." },
      { status: 400 }
    );
  }

  try {
    const file = await fs.readFile(usersPath, "utf8");
    const users: User[] = JSON.parse(file || "[]");

    if (users.some((user) => user.username === username)) {
      return NextResponse.json(
        { message: "Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác." },
        { status: 409 }
      );
    }

    users.push({ fullName, username, password, phone });
    await fs.writeFile(usersPath, JSON.stringify(users, null, 2), "utf8");

    return NextResponse.json({ message: "Đăng ký thành công!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi máy chủ khi đăng ký. Vui lòng thử lại." },
      { status: 500 }
    );
  }
}
