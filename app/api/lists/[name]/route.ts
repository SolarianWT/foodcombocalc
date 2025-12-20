import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const LISTS_DIR = path.resolve(process.cwd(), "lists");
const ORDER_FILE = path.join(LISTS_DIR, "_order.json");

export async function GET(req: Request) {
  const url = new URL(req.url);
  const parts = url.pathname.split("/").filter(Boolean);
  const name = decodeURIComponent(parts[parts.length - 1] || "");
  const full = path.join(LISTS_DIR, name);
  try {
    const content = await fs.readFile(full, "utf-8");
    if (url.searchParams.get("download")) {
      return new NextResponse(content, {
        headers: {
          "Content-Type": "application/json",
          "Content-Disposition": `attachment; filename="${name}"`,
        },
      });
    }
    return NextResponse.json(JSON.parse(content));
  } catch (e) {
    return new NextResponse(JSON.stringify({ error: "Not found" }), { status: 404 });
  }
}

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const parts = url.pathname.split("/").filter(Boolean);
  const name = decodeURIComponent(parts[parts.length - 1] || "");
  const full = path.join(LISTS_DIR, name);
  try {
    await fs.unlink(full);
    try {
      const txt = await fs.readFile(ORDER_FILE, 'utf-8').catch(() => '[]');
      const order = JSON.parse(txt || '[]');
      const next = (order || []).filter((f: string) => f !== name);
      await fs.writeFile(ORDER_FILE, JSON.stringify(next, null, 2), 'utf-8');
    } catch (e) {}
    return NextResponse.json({ ok: true });
  } catch (e) {
    return new NextResponse(JSON.stringify({ error: "Not found" }), { status: 404 });
  }
}

export async function PUT(req: Request) {
  const url = new URL(req.url);
  const parts = url.pathname.split("/").filter(Boolean);
  const name = decodeURIComponent(parts[parts.length - 1] || "");
  const full = path.join(LISTS_DIR, name);
  const body = await req.json().catch(() => ({} as any));
  const { content, newName } = body as { content?: any; newName?: string };
  try {
    if (content) {
      await fs.writeFile(full, JSON.stringify(content, null, 2), "utf-8");
    }
    if (newName) {
      const dest = path.join(LISTS_DIR, newName);
      try {
        await fs.access(dest);
        return new NextResponse(JSON.stringify({ error: "Target already exists" }), { status: 409 });
      } catch (e) {
      }
      await fs.rename(full, dest);
      try {
        const txt = await fs.readFile(ORDER_FILE, 'utf-8').catch(() => '[]');
        const order = JSON.parse(txt || '[]');
        const next = (order || []).map((f: string) => f === name ? newName : f);
        await fs.writeFile(ORDER_FILE, JSON.stringify(next, null, 2), 'utf-8');
      } catch (e) {}
      return NextResponse.json({ filename: newName });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    return new NextResponse(JSON.stringify({ error: "Failed" }), { status: 500 });
  }
}