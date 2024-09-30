import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const protectedRoutes = ["/profile", "/trackers"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isAuthenticated = cookies().has("logged_in");
  console.log("isAuthenticated", isAuthenticated);


  if (path === "/login" && isAuthenticated) {
    return NextResponse.redirect(new URL("/profile", req.nextUrl));
  }

  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}

