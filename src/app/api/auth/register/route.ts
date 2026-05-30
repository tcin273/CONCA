import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

type NewUser = {
  fullName: string;
  username: string;
  password: string;
  phone?: string;
};

const usersPath = path.join(process.cwd(), "src", "app", "api", "auth", "users.json");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;
const useSupabase = Boolean(supabaseUrl && supabaseKey);
const supabase = useSupabase ? createClient(supabaseUrl as string, supabaseKey as string) : null;

async function readUsers(): Promise<NewUser[]> {
  try {
    const raw = await fs.readFile(usersPath, "utf8");
    return JSON.parse(raw || "[]");
  } catch (err) {
    return [];
  }
}

async function writeUsers(users: NewUser[]) {
  try {
    await fs.writeFile(usersPath, JSON.stringify(users, null, 2), "utf8");
  } catch (err: any) {
    // If filesystem is read-only (e.g., Vercel), fallback to global in-memory store
    const g: any = global as any;
    g.globalUsers = g.globalUsers || [];
    users.forEach((u) => {
      if (!g.globalUsers.find((gu: any) => gu.username === u.username)) g.globalUsers.push(u);
    });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, username, password, phone } = body as NewUser;

    if (!fullName || !username || !password) {
      return NextResponse.json({ message: "Vui lòng điền đầy đủ thông tin." }, { status: 400 });
    }

    // If Supabase configured, try to persist there first (recommended for Vercel)
    if (useSupabase && supabase) {
      try {
        const { data: existing } = await supabase.from("users").select("username").eq("username", username).limit(1);
        if (existing && existing.length) return NextResponse.json({ message: "Tên đăng nhập đã tồn tại." }, { status: 409 });
        const hashed = await bcrypt.hash(password, 10);
        const insertRes = await supabase.from("users").insert([{ fullName, username, password: hashed, phone: phone || "" }]);
        if ((insertRes as any).error) throw (insertRes as any).error;
        return NextResponse.json({ message: "Đăng ký thành công.", source: "supabase" }, { status: 201 });
      } catch (supErr) {
        // fallthrough to file/global fallback
      }
    }

    // Local/dev: persist to users.json
    const users = await readUsers();
    const exists = users.find((u) => u.username === username);
    if (exists) return NextResponse.json({ message: "Tên đăng nhập đã tồn tại." }, { status: 409 });
    // hash password before storing locally
    const hashed = await bcrypt.hash(password, 10);
    users.push({ fullName, username, password: hashed, phone: phone || "" });
    await writeUsers(users);
    return NextResponse.json({ message: "Đăng ký thành công.", source: "filesystem_or_memory" }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Lỗi máy chủ." }, { status: 500 });
  }
}