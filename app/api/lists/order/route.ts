import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const LISTS_DIR = path.resolve(process.cwd(), "lists");
const ORDER_FILE = path.join(LISTS_DIR, "_order.json");

async function ensureDir() {
  try {
    await fs.mkdir(LISTS_DIR, { recursive: true });
  } catch (e) {}
}

export async function GET() {
  await ensureDir();
  try {
    const content = await fs.readFile(ORDER_FILE, "utf-8");
    return NextResponse.json(JSON.parse(content));
  } catch (e) {
    return NextResponse.json(null);
  }
}

export async function PUT(req: Request) {
  await ensureDir();
  const body = await req.json().catch(() => null);
  if (!Array.isArray(body)) return new NextResponse(null, { status: 400 });
  await fs.writeFile(ORDER_FILE, JSON.stringify(body, null, 2), "utf-8");
  return NextResponse.json({ ok: true });
}