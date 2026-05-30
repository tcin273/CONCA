import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

type ContactMessage = {
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

const messagesPath = path.join(process.cwd(), "src", "app", "api", "contact", "messages.json");
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;
const useSupabase = Boolean(supabaseUrl && supabaseKey);
const supabase = useSupabase ? createClient(supabaseUrl as string, supabaseKey as string) : null;

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
    // If Supabase configured, try to insert message there first
    if (useSupabase && supabase) {
      try {
        const newMessage: ContactMessage = {
          name,
          email,
          message,
          createdAt: new Date().toISOString(),
        };
        const insert = await supabase.from("messages").insert([newMessage]);
        if ((insert as any).error) throw (insert as any).error;
        return NextResponse.json({ message: "Gửi yêu cầu thành công!", source: "supabase" }, { status: 201 });
      } catch (supErr) {
        // fallback to file/global
      }
    }

    const messages = await readMessages();
    const newMessage: ContactMessage = {
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
    };
    messages.push(newMessage);
    try {
      await fs.writeFile(messagesPath, JSON.stringify(messages, null, 2), "utf8");
      return NextResponse.json({ message: "Gửi yêu cầu thành công!" }, { status: 201 });
    } catch (writeErr: any) {
      const g: any = global as any;
      g.globalMessages = g.globalMessages || [];
      g.globalMessages.push(newMessage);
      return NextResponse.json({ message: "Gửi yêu cầu thành công!", note: "stored-in-memory" }, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi khi gửi yêu cầu. Vui lòng thử lại sau." },
      { status: 500 }
    );
  }
}
