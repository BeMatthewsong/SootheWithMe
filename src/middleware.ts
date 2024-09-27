import { NextRequest, NextResponse } from 'next/server';
import { getCookie } from './actions/auth/cookie/cookie';

export async function middleware(req: NextRequest) {
  const token = await getCookie('token');
  if (!token) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  return NextResponse.next();
}

// 미들웨어에 추가할 엔드포인트입니다.
export const config = {
  matcher: ['/mypage/:path*'],
};
