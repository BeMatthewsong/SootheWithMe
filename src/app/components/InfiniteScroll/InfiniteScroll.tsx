import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
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
  limit = 5,
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
      queryFn: async ({ pageParam = 0 }) => queryFn(pageParam),
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
  /* @todo 임시 에러 처리 */
  if (isError)
    return (
      <div className='flex grow items-center justify-center text-[14px] font-medium text-gray-500'>
        Error occurred
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
      {/* //@todo 로딩시 스핀 애니메이션 추가 */}
      {isFetching && (
        <div className='flex grow items-center justify-center text-[14px] font-medium text-gray-500'>
          Loading...
        </div>
      )}
      <div ref={ref} />
    </>
  );
};

export default InfiniteScroll;
