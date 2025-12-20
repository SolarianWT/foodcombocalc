import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const LISTS_DIR = path.resolve(process.cwd(), "lists");
const ORDER_FILE = path.join(LISTS_DIR, "_order.json");

async function ensureDir() {
  try {
    await fs.mkdir(LISTS_DIR, { recursive: true });
  } catch (e) {
  }
}

export async function GET() {
  await ensureDir();
  const files = await fs.readdir(LISTS_DIR).catch(() => []);
  const jsonFiles = files.filter(f => f.endsWith(".json") && !f.startsWith("_"));
  const lists = jsonFiles.map(f => {
    const m = f.match(/^(\d+)\.json$/);
    return { filename: f, displayName: m ? `List ${m[1]}` : f.replace(/\.json$/, "") };
  });
  return NextResponse.json(lists);
}

export async function POST(req: Request) {
  await ensureDir();
  const body = await req.json().catch(() => ({} as any));
  let { filename, content } = body as { filename?: string; content?: any };
  if (!content) content = [];
  if (!filename) {
    const files = (await fs.readdir(LISTS_DIR)).filter(f => f.endsWith(".json") && !f.startsWith("_"));
    const nums = files.map(f => {
      const m = f.match(/^(\d+)\.json$/);
      return m ? Number(m[1]) : null;
    }).filter(n => n !== null) as number[];
    const used = new Set(nums);
    let candidate = 1;
    while (used.has(candidate)) candidate++;
    filename = `${candidate}.json`;
  }
  const full = path.join(LISTS_DIR, filename);
  async function uniqueName(orig: string) {
    let dest = path.join(LISTS_DIR, orig);
    try {
      await fs.access(dest);
      const m = orig.match(/^(.*?)(?:-(\d+))?(\.json)$/);
      const base = m ? m[1] : orig.replace(/\.json$/, '');
      const ext = m ? m[3] : '.json';
      let i = 1;
      while (true) {
        const name = `${base}-${i}${ext}`;
        const p = path.join(LISTS_DIR, name);
        try { await fs.access(p); i++; continue; } catch (e) { return name; }
      }
    } catch (e) {
      return orig;
    }
  }

  const safeFilename = await uniqueName(filename);
  const safeFull = path.join(LISTS_DIR, safeFilename);
  await fs.writeFile(safeFull, JSON.stringify(content, null, 2), "utf-8");
  try {
    let order: string[] = [];
    try {
      const txt = await fs.readFile(ORDER_FILE, 'utf-8');
      order = JSON.parse(txt) || [];
    } catch (e) {
      order = [];
    }
    if (!order.includes(safeFilename)) {
      order.push(safeFilename);
      await fs.writeFile(ORDER_FILE, JSON.stringify(order, null, 2), 'utf-8');
    }
  } catch (e) {
  }
  return NextResponse.json({ filename: safeFilename });
}