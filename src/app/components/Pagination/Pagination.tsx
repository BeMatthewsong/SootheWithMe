'use client';

import { useState, useEffect } from 'react';
import { IconChevronLeft, IconChevronRight } from '@/public/icons';

const MAX_PAGES_TO_SHOW_TABLET = 4; // 태블릿에서 표시할 최대 페이지 수
const MAX_PAGES_TO_SHOW_DESKTOP = 6; // 데스크톱에서 표시할 최대 페이지 수

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  // 태블릿 사이즈 분기점
  const [isTablet, setIsTablet] = useState<boolean>(false);

  // 태블릿 사이즈보다 큰지 작은지 확인
  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth <= 1024);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 페이지 버튼 클릭 시 그 페이지로 변경하는 함수
  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  // 페이지네이션 범위 설정 함수
  const getPaginationRange = () => {
    const range: (number | string)[] = [];
    const maxPagesToShow = isTablet
      ? MAX_PAGES_TO_SHOW_TABLET
      : MAX_PAGES_TO_SHOW_DESKTOP;

    // 총 페이지 수가 maxPagesToShow보다 적은 경우
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
    } else {
      // 중간값 판별을 위한 변수
      const half = Math.floor(maxPagesToShow / 2);

      // 현재 페이지가 시작 부분에 가까운 경우
      if (currentPage <= half) {
        for (let i = 1; i <= maxPagesToShow - 1; i++) {
          range.push(i);
        }
        range.push('···', totalPages);
      }
      // 현재 페이지가 끝 부분에 가까운 경우
      else if (currentPage >= totalPages - half) {
        range.push(1, '···');
        for (let i = totalPages - (maxPagesToShow - 2); i <= totalPages; i++) {
          range.push(i);
        }
      }
      // 현재 페이지가 중간에 있는 경우
      else {
        range.push(1, '···');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          if (i > 1 && i < totalPages) {
            range.push(i);
          }
        }
        range.push('···', totalPages);
      }
    }

    return range;
  };

  return (
    <div className='mt-6 flex justify-center gap-2'>
      {/* 이전 페이지 버튼 */}
      <button
        className={`rounded-lg border p-[10px] ${
          currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
        }`}
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <IconChevronLeft />
      </button>

      {/* 페이지 버튼 */}
      {getPaginationRange().map((item, index) =>
        typeof item === 'number' ? (
          <button
            key={item}
            data-testid={`page-button-${item}`}
            className={`rounded-lg border p-[10px] ${
              currentPage === item
                ? 'text-16 font-semibold text-var-black'
                : 'text-16 font-normal text-var-gray-200'
            }`}
            onClick={() => handlePageClick(item)}
          >
            {item}
          </button>
        ) : (
          <span
            key={`ellipsis-${index}`}
            className='rounded-lg p-[10px] text-16 font-normal text-var-gray-200'
          >
            ···
          </span>
        ),
      )}

      {/* 다음 페이지 버튼 */}
      <button
        className={`rounded-lg border p-[10px] ${
          currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''
        }`}
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <IconChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
