import { setCookie } from '@/actions/auth/cookie/cookie';
import { NextResponse } from 'next/server';

export interface LoginResponse {
  token: string;
}

/* 로그인시 사용할 route.ts입니다. */
export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auths/signin`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );

    // API 응답 상태 확인
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message || '로그인 실패' },
        { status: response.status },
      );
    }

    const { token }: LoginResponse = await response.json();
    await setCookie('token', token);

    return NextResponse.json({ message: '로그인 성공' }, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : '알 수 없는 오류 발생';
    return NextResponse.json(
      { message: '로그인 실패', error: errorMessage },
      { status: 500 },
    );
  }
};
