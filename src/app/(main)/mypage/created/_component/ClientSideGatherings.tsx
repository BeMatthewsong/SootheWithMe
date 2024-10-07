'use client';

import { useUserCreated } from '@/hooks/useUserCreated';
import GatheringList from './GatheringList';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { GatheringsListData } from '@/types/data.type';
import Loader from '@/app/components/Loader/Loader';

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
      {isLoading && (
        <div className='flex items-center justify-center pt-24'>
          <Loader />
        </div>
      )}

      {hasMore && <div ref={ref} className='h-24' />}
    </>
  );
};

export default ClientSideGatherings;
