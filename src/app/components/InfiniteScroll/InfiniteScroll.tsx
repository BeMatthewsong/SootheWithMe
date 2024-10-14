import { useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import {
  DEFAULT_GATHERINGS_LIMIT,
  DEFAULT_GATHERINGS_OFFSET,
} from '@/constants/common';
import Loader from '../Loader/Loader';
interface ItemWithId {
  id: number;
}

interface InfiniteQueryResponse<T extends ItemWithId> {
  hasNextPage: boolean;
  offset: number;
  data: T[];
}

interface InfiniteScrollProps<T extends ItemWithId> {
  initData: T[];
  queryKey: readonly string[];
  queryFn: (offset?: number) => Promise<InfiniteQueryResponse<T>>;
  limit?: number;
  emptyText: string;
  errorText: string;
  renderItem: (item: T, index: number) => JSX.Element;
}

const InfiniteScroll = <T extends ItemWithId>({
  initData,
  queryKey,
  queryFn,
  limit = DEFAULT_GATHERINGS_LIMIT,
  emptyText,
  errorText,
  renderItem,
}: InfiniteScrollProps<T>) => {
  const [topGradientVisible, setTopGradientVisible] = useState(false);
  const [bottomGradientVisible, setBottomGradientVisible] = useState(false);

  const { ref, inView } = useInView({ threshold: 0 });
  const { ref: firstGatheringRef, inView: firstInView } = useInView({
    threshold: 0,
  });
  const { ref: lastGatheringRef, inView: lastInView } = useInView({
    threshold: 0,
  });

  const { data, isError, isFetching, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: async ({ pageParam = DEFAULT_GATHERINGS_LIMIT }) =>
        queryFn(pageParam),
      getNextPageParam: (lastPage) => {
        return lastPage.hasNextPage ? lastPage.offset + limit : undefined;
      },
      initialPageParam: DEFAULT_GATHERINGS_OFFSET,
      initialData: {
        pages: [
          {
            hasNextPage: initData.length === DEFAULT_GATHERINGS_LIMIT,
            offset: DEFAULT_GATHERINGS_OFFSET,
            data: initData,
          },
        ],
        pageParams: [DEFAULT_GATHERINGS_OFFSET],
      },
    });

  useEffect(() => {
    setTopGradientVisible(!firstInView);
    setBottomGradientVisible(!lastInView);
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, firstInView, lastInView]);

  // 데이터가 없거나 비어있을 때 emptyText를 표시
  if (!data || data.pages[0].data.length === 0) {
    return (
      <div className='flex grow items-center justify-center text-[14px] font-medium text-gray-500 dark:text-neutral-200'>
        {emptyText}
      </div>
    );
  }

  if (isError)
    return (
      <div className='flex grow items-center justify-center text-[14px] font-medium text-gray-500 dark:text-neutral-200'>
        {errorText}
      </div>
    );

  const allItems = data.pages.flatMap((page) => page.data);
  return (
    <>
      {/* Top gradient */}
      <div
        className={`fixed left-0 right-0 top-56 z-[30] h-16 bg-gradient-to-b from-white to-transparent p-10 transition-opacity duration-500 ease-in-out md:top-60 ${
          topGradientVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Bottom gradient */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-[30] h-16 bg-gradient-to-t from-white to-transparent p-10 transition-opacity duration-500 ease-in-out ${
          bottomGradientVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <ul className='flex h-full flex-col'>
        {allItems.map((item, index) => (
          <li
            key={item.id}
            ref={
              index === 0
                ? firstGatheringRef
                : index === initData.length - 1
                  ? lastGatheringRef
                  : null
            }
          >
            {renderItem(item, index)}
          </li>
        ))}
      </ul>
      {isFetching && (
        <div className='flex h-80 grow items-center justify-center'>
          <span>
            <Loader />
          </span>
        </div>
      )}
      <div ref={ref} />
    </>
  );
};

export default InfiniteScroll;
