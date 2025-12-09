import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  console.log(request.cookies);
  const token = request.cookies.get("token")?.value;
  console.log(token);
  if (!token) {
    return NextResponse.redirect(new URL("/login?error=no-token", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};
