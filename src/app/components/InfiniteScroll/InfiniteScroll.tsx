import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { DEFAULT_LIMIT } from '@/constants/common';
interface ItemWithId {
  id: number;
}

interface InfiniteQueryResponse<T extends ItemWithId> {
  hasNextPage: boolean;
  offset: number;
  data: T[];
}

interface InfiniteScrollProps<T extends ItemWithId> {
  queryKey: string[];
  queryFn: (offset?: number) => Promise<InfiniteQueryResponse<T>>;
  limit?: number;
  emptyText: string;
  renderItem: (item: T, index: number) => JSX.Element;
}

const InfiniteScroll = <T extends ItemWithId>({
  queryKey,
  queryFn,
  limit = DEFAULT_LIMIT,
  emptyText,
  renderItem,
}: InfiniteScrollProps<T>) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 1.0,
  });

  const { data, isError, isFetching, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: async ({ pageParam = DEFAULT_LIMIT }) => queryFn(pageParam),
      getNextPageParam: (lastPage) => {
        return lastPage.hasNextPage ? lastPage.offset + limit : undefined;
      },
      initialPageParam: 0,
    });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  // 데이터가 없거나 비어있을 때 emptyText를 표시
  if (!data || data.pages.length === 0) {
    return (
      <div className='flex grow items-center justify-center text-[14px] font-medium text-gray-500'>
        {emptyText}
      </div>
    );
  }

  if (isError)
    return (
      <div className='flex grow items-center justify-center text-[14px] font-medium text-gray-500'>
        모임을 불러오지 못했습니다.
      </div>
    );

  return (
    <>
      <ul className='flex h-full flex-col'>
        {data &&
          data.pages.map((page) =>
            page.data.map((item, index: number) => (
              <li key={item.id}>{renderItem(item, index)}</li> // 사용자 정의 컴포넌트를 렌더링
            )),
          )}
      </ul>
      {isFetching && (
        <div className='flex grow items-center justify-center'>
          <div className='h-6 w-6 animate-spin rounded-full border-4 border-gray-300 border-t-transparent'></div>
          <span className='ml-2 text-[14px] font-medium text-gray-500'>
            Loading...
          </span>
        </div>
      )}
      <div ref={ref} />
    </>
  );
};

export default InfiniteScroll;
