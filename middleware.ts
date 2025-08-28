import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin subroutes except the login page itself
  const isAdminArea = pathname.startsWith('/admin') && pathname !== '/admin';
  if (!isAdminArea) return NextResponse.next();

  const token = request.cookies.get('token')?.value;
  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin';
    return NextResponse.redirect(url);
  }

  try {
    jwt.verify(token, JWT_SECRET);
    return NextResponse.next();
  } catch {
    const url = request.nextUrl.clone();
    url.pathname = '/admin';
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ['/admin/:path*'],
};


