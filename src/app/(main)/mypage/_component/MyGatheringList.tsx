'use client';

import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import Card from '@/app/components/Card/Card';
import { myGatheringData } from '@/types/data.type';
import fetchGatherings from './fetch';

const MyGatheringList = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 1.0,
  });

  const { data, isError, isLoading, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['gatherings'],
      queryFn: async ({ pageParam = 0 }) => fetchGatherings(pageParam),
      getNextPageParam: (lastPage) => {
        return lastPage.hasNextPage ? lastPage.page + 1 : undefined;
      },
      initialPageParam: 0,
    });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  //@todo 로딩 및 에러 로직 추가예정
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error occurred</p>;
  return (
    <div>
      <ul>
        {data?.pages.map((page) =>
          page.data.map((item: myGatheringData, index: number) => (
            <li key={index}>
              <Card
                data={item}
                hasButton={true}
                hasChips={true}
                handleCancelGatherings={() => console.log('Cancel gathering')}
                handleWriteReview={() => console.log('Write review')}
              />
            </li>
          )),
        )}
      </ul>
      <div ref={ref} style={{ height: '20px' }} />
    </div>
  );
};

export default MyGatheringList;
