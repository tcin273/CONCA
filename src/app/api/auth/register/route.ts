import { NextResponse } from "next/server";

type User = {
  fullName: string;
  username: string;
  password: string;
  phone?: string;
};

// Khởi tạo một mảng toàn cục trong bộ nhớ RAM để lưu danh sách user tạm thời
// Có sẵn 1 tài khoản admin để bạn test đăng nhập nếu cần
if (!(global as any).globalUsers) {
  (global as any).globalUsers = [
    { fullName: "Tú Trinh", username: "trinh", password: "123", phone: "0123456789" }
  ];
}

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
    // Lấy danh sách users từ bộ nhớ RAM ra để kiểm tra thay vì đọc file JSON
    const users: User[] = (global as any).globalUsers;

    if (users.some((user) => user.username === username)) {
      return NextResponse.json(
        { message: "Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác." },
        { status: 409 }
      );
    }

    // Đẩy user mới vào mảng RAM công cộng
    users.push({ fullName, username, password, phone });

    return NextResponse.json({ message: "Đăng ký thành công!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi máy chủ khi đăng ký. Vui lòng thử lại." },
      { status: 500 }
    );
  }
}