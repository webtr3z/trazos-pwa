import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const jwt = (await cookies()).get("jwt")?.value;
  //   console.log("MIDDLEWARE", jwt);

  // Only protect dashboard routes
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!jwt) {
      return NextResponse.redirect(new URL("/auth", request.url));
    } else {
      return NextResponse.next();
    }
  }
  // Allow all other routes to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all dashboard routes
     */
    "/:path*",
  ],
};
