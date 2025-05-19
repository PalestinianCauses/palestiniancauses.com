// REVIEWED

import { NextRequest, NextResponse } from "next/server";

const PATHS_PROTECTED = ["/admin", "/humans-but-from-gaza"];
const PATHS_AUTHENTICATION = ["/signin", "/signup"];

export const middleware = async function middleware({
  url: RequestURL,
  nextUrl: NextURL,
  cookies,
}: NextRequest) {
  const { pathname } = NextURL;

  const token = cookies.get("payload-token");
  const isAuthenticated = token ? Boolean(token.value) : false;

  if (
    PATHS_PROTECTED.some((path) => pathname.startsWith(path)) &&
    !isAuthenticated
  ) {
    const redirectTo = new URL("/signin", RequestURL);
    redirectTo.searchParams.set("redirect", pathname);
    return NextResponse.redirect(redirectTo);
  }

  if (
    PATHS_AUTHENTICATION.some((path) => pathname.startsWith(path)) &&
    isAuthenticated
  ) {
    return NextResponse.redirect(new URL("/", RequestURL));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public|api).*)"],
};
