import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import {
  DEFAULT_GATHERINGS_LIMIT,
  DEFAULT_GATHERINGS_OFFSET,
} from '@/constants/common';
import Loader from '../Loader/Loader';
import useScrollGradientEffect from '@/hooks/useScrollGradientEffect';
import GradientOverlay from '../GradientOverlay/GradientOverlay';

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
  const {
    topGradientVisible,
    bottomGradientVisible,
    firstItemRef: firstGatheringRef,
    lastItemRef: lastGatheringRef,
  } = useScrollGradientEffect();

  const { ref, inView } = useInView({ threshold: 0 });

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
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

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
      <GradientOverlay position='top' isVisible={topGradientVisible} />
      <GradientOverlay position='bottom' isVisible={bottomGradientVisible} />

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
