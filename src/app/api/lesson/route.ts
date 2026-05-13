import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import { join } from "path";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lang = searchParams.get("lang");
  const lesson = searchParams.get("lesson");

  if (!lang || !lesson) {
    return new NextResponse("Missing params", { status: 400 });
  }

  // Sanitize to prevent path traversal
  const safeLang = lang.replace(/[^a-z0-9_-]/gi, "");
  const safeLesson = lesson.replace(/[^a-z0-9_-]/gi, "");

  try {
    const filePath = join(process.cwd(), "content", safeLang, `${safeLesson}.mdx`);
    const content = await readFile(filePath, "utf-8");
    return new NextResponse(content, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch {
    return new NextResponse(`# ${safeLesson}\n\nContent coming soon!`, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lang = searchParams.get("lang");
  const lesson = searchParams.get("lesson");

  if (!lang || !lesson) {
    return new NextResponse("Missing params", { status: 400 });
  }

  // Sanitize to prevent path traversal
  const safeLang = lang.replace(/[^a-z0-9_-]/gi, "");
  const safeLesson = lesson.replace(/[^a-z0-9_-]/gi, "");

  try {
    const body = await req.json();
    const { content } = body;

    const dirPath = join(process.cwd(), "content", safeLang);
    const filePath = join(dirPath, `${safeLesson}.mdx`);

    // Ensure the directory exists
    await mkdir(dirPath, { recursive: true });
    
    // Write the new content to the file
    await writeFile(filePath, content, "utf-8");

    return NextResponse.json({ success: true });
  } catch (error) {
    return new NextResponse("Failed to save", { status: 500 });
  }
}
