import mockData from '@/app/(main)/mypage/mockData/mockData';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get('page')) || 0;

  const PAGE_SIZE = 5; // 페이지 당 데이터 개수
  const start = page * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  // 데이터 슬라이싱
  const data = mockData.slice(start, end);

  // 전체 데이터 길이와 비교하여 다음 페이지가 있는지 결정
  const hasNextPage = end < mockData.length;

  return NextResponse.json({
    data,
    hasNextPage,
    page, // 현재 페이지 번호 반환
  });
}
