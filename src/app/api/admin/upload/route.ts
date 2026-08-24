import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getSession } from "@/lib/auth";
import { nanoid } from "nanoid";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }

  const { env } = await getCloudflareContext({ async: true });
  const ext = file.name.split(".").pop() || "jpg";
  const key = `products/${nanoid()}.${ext}`;

  await env.MEDIA.put(key, await file.arrayBuffer(), {
    httpMetadata: { contentType: file.type || "application/octet-stream" },
  });

  const publicUrl = `${process.env.R2_PUBLIC_URL ?? ""}/${key}`;
  return NextResponse.json({ url: publicUrl, key });
}
