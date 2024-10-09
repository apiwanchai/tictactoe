import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"; 

export async function middleware(req: { nextUrl: { clone: () => any; }; }) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}


export const config = {
  matcher: ["/game"], 
};
