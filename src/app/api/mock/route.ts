import mockData from '@/app/(main)/mypage/mockData/mockData';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const offset = Number(searchParams.get('offset')) || 0;
  const limit = Number(searchParams.get('limit')) || 5;

  const end = offset + limit;
  // 데이터 슬라이싱
  const data = mockData.slice(offset, end);

  // 전체 데이터 길이와 비교하여 다음 페이지가 있는지 결정
  const hasNextPage = data.length === limit;

  return NextResponse.json({
    data: data, // API에서 반환하는 데이터
    hasNextPage, // 다음 페이지 여부
    offset, // 조회시작 위치
  });
}
