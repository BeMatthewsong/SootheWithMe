import { getCookie } from '@/actions/auth/cookie/cookie';
import {
  DEFAULT_GATHERINGS_LIMIT,
  DEFAULT_GATHERINGS_OFFSET,
} from '@/constants/common';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const offset =
    Number(searchParams.get('offset')) || DEFAULT_GATHERINGS_OFFSET;
  const limit = Number(searchParams.get('limit')) || DEFAULT_GATHERINGS_LIMIT;

  const token = await getCookie('token');

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/gatherings/joined?offset=${offset}&limit=${limit}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const data = await response.json();

  // 데이터 길이와 비교하여 다음 페이지가 있는지 결정
  const hasNextPage = data.length === limit;

  return NextResponse.json({
    data: data, // API에서 반환하는 데이터
    hasNextPage, // 다음 페이지 여부
    offset, // 조회시작 위치
  });
}
