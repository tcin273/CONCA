import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

type ContactMessage = {
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

const messagesPath = path.join(process.cwd(), "src", "app", "api", "contact", "messages.json");

async function readMessages() {
  try {
    const file = await fs.readFile(messagesPath, "utf8");
    return JSON.parse(file || "[]") as ContactMessage[];
  } catch {
    return [];
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json(
      { message: "Vui lòng điền đầy đủ tên, email và nội dung liên hệ." },
      { status: 400 }
    );
  }

  try {
    const messages = await readMessages();
    const newMessage: ContactMessage = {
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
    };
    messages.push(newMessage);
    await fs.writeFile(messagesPath, JSON.stringify(messages, null, 2), "utf8");

    return NextResponse.json({ message: "Gửi yêu cầu thành công!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi khi gửi yêu cầu. Vui lòng thử lại sau." },
      { status: 500 }
    );
  }
}
