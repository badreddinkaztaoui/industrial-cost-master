import { NextResponse } from 'next/server';

// Paths that don't require authentication
const publicPaths = ['/', '/auth/login', '/api/auth'];

/**
 * Simplified middleware function for demo purposes
 * In a real app, this would verify JWT tokens and handle proper auth
 * @param {Request} request - The incoming request
 */
export function middleware(request) {
  const { pathname } = new URL(request.url);
  
  // Check if the path is public
  if (publicPaths.some(path => pathname === path || pathname.startsWith(`${path}/`))) {
    return NextResponse.next();
  }
  
  // For demo purposes, all API routes are public
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }
  
  // For regular pages, we'll just check if we're on a protected route
  // In a real app, this would verify the auth token
  
  // For demo purposes, we'll just redirect to login if needed
  // The client-side auth.js will handle checking localStorage
  return NextResponse.next();
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
