import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { createSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const username = String(form.get("username") ?? "");
  const password = String(form.get("password") ?? "");

  const { env } = await getCloudflareContext({ async: true });

  const validUsername = env.ADMIN_USERNAME;
  const validHash = env.ADMIN_PASSWORD_HASH;

  if (!validUsername || !validHash) {
    return NextResponse.redirect(new URL("/admin/login?error=config", req.url));
  }

  const usernameOk = username === validUsername;
  const passwordOk = usernameOk && (await bcrypt.compare(password, validHash));

  if (!usernameOk || !passwordOk) {
    return NextResponse.redirect(new URL("/admin/login?error=1", req.url));
  }

  await createSession(username);
  return NextResponse.redirect(new URL("/admin", req.url));
}
