'use client';

import { useUserCreated } from '@/hooks/useUserCreated';
import GatheringList from './GatheringList';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { GatheringsListData } from '@/types/data.type';

interface ClientSideGatheringsProps {
  gatherings: GatheringsListData[];
  createdBy: string;
}

const ClientSideGatherings = ({
  gatherings,
  createdBy,
}: ClientSideGatheringsProps) => {
  const { gatheringsList, isLoading, hasMore, loadMore } = useUserCreated(
    gatherings,
    createdBy,
  );

  const { ref, inView } = useInView({ threshold: 1.0 });

  useEffect(() => {
    if (inView && hasMore) {
      loadMore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, hasMore]);

  return (
    <>
      <GatheringList dataList={gatheringsList} />
      {/* TODO : 로딩 상태에 대해 논의 후 디자인 통일 */}
      {isLoading && <p>로딩 스피너</p>}

      {hasMore && <div ref={ref} className='h-20' />}
    </>
  );
};

export default ClientSideGatherings;
