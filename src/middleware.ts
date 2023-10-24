import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { decodeJWT } from "./utils/jwtDecode";

export function middleware(request: NextRequest) {
  let cookieToken = request.cookies.get("accessToken");
  const token = cookieToken?.value;
  const decoded = token ? decodeJWT(token) : null;
  const userId = decoded ? decoded.sub : null;
  const expirationTimestamp = decoded ? decoded.exp : null;

  if (
    expirationTimestamp &&
    new Date().getTime() > expirationTimestamp * 1000 &&
    (request.nextUrl.pathname.startsWith("/user") ||
      request.nextUrl.pathname.startsWith("/admin"))
  ) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/unauthorized")) {
    if (
      expirationTimestamp &&
      new Date().getTime() > expirationTimestamp * 1000
    ) {
      return NextResponse.next(); // Allow access to the "/unauthorized" page if the token is expired
    } else {
      return NextResponse.redirect(new URL("/user", request.url)); // Redirect to the previous page
    }
  }

  if (request.nextUrl.pathname.startsWith("/entry")) {
    if (userId && userId.includes("user")) {
      return NextResponse.redirect(new URL("/user", request.url));
    } else if (userId && userId.includes("admin")) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  if (userId && userId.includes("user")) {
    if (request.nextUrl.pathname.startsWith("/user")) {
      return NextResponse.next(); // Allow access to the "/user" route if the role is "user"
    }
    return NextResponse.redirect(new URL("/user", request.url));
  } else if (userId && userId.includes("admin")) {
    if (request.nextUrl.pathname.startsWith("/admin")) {
      return NextResponse.next(); // Allow access to the "/admin" route if the role is "admin"
    }
    return NextResponse.redirect(new URL("/admin", request.url));
  }
  return NextResponse.redirect(new URL("/entry", request.url));
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*", "/entry/:path", "/unauthorized"],
};
