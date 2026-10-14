import { NextResponse } from "next/server";
import { auth } from "../auth";

export const proxy = auth((request) => {
  if (!request.auth?.user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set(
      "callbackUrl",
      request.nextUrl.pathname + request.nextUrl.search,
    );
    return NextResponse.redirect(loginUrl);
  }
});

export const config = { matcher: ["/dashboard/:path*", "/movie/:path*"] };
