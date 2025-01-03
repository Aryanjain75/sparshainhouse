import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

// Define the expected structure of the JWT payload
interface JwtPayload {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('Token')?.value || '';
  const path = request.nextUrl.pathname;

  // Handle redirection logic based on the path
  if (token) {
    switch (path) {
      case '/theater-booking':
      case '/restaurant':
      case '/birthdayhallbooking':
      case '/profile':
      case '/profile/orders':
      case '/profile/update':
      case '/profile/updatepassword':
      case '/updateaddress/[id]':
        return NextResponse.next();
      case '/admin':
      case '/admin/users':
      case '/admin/products':
        try {
          const userDetails = jwt.decode(token) as JwtPayload;
          console.log(userDetails);
          if (!userDetails.isAdmin) {
          return NextResponse.redirect(new URL('/', request.nextUrl));
        }
        } catch (error) {
            console.log(error)
          return NextResponse.redirect(new URL('/login', request.nextUrl));
        }
        return NextResponse.next();
      case '/login':
      case '/verifyemail':
      case '/verify':
      case '/reset-password':
      case '/Registration':
      case '/forgetpassword':
        return NextResponse.redirect(new URL('/', request.nextUrl));
      default:
        return NextResponse.next();
    }
  } else {
    switch (path) {
      case '/theater-booking':
      case '/restaurant':
      case '/birthdayhallbooking':
      case '/profile':
      case '/profile/orders':
      case '/profile/update':
      case '/profile/updatepassword':
      case '/updateaddress/[id]':
      case '/admin':
      case '/admin/users':
      case '/products':
        return NextResponse.redirect(new URL('/login', request.nextUrl));
      case '/login':
      case '/verifyemail':
      case '/verify':
      case '/reset-password':
      case '/Registration':
      case '/forgetpassword':
        return NextResponse.next();
      case '/':
      case '/Menu':
      case '/Photos':
      case '/cart':
        return NextResponse.next();
      default:
        return NextResponse.next();
    }
  }
}

export const config = {
  matcher: [
    '/',
    '/Menu',
    '/Photos',
    '/cart',
    '/login',
    '/verifyemail',
    '/verify',
    '/reset-password',
    '/Registration',
    '/forgetpassword',
    '/admin/users',
    '/admin/users/[id]',
    '/updatepassword',
    '/updateaddress/[id]',
    '/theater-booking',
    '/restaurant',
    '/profile',
    '/profile/orders',
    '/profile/update',
    '/products',
    '/dashbord',
    '/birthdayhallbooking',
    '/addnewaddress',
    '/admin'
  ],
};
