'use client';

import toast from 'react-hot-toast';
import { useUserCreated } from '@/hooks/useUserCreated';
import GatheringList from './GatheringList';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { GatheringsListData } from '@/types/data.type';
import Loader from '@/app/components/Loader/Loader';

interface ClientSideGatheringsProps {
  initialGatheringList: GatheringsListData[];
  createdBy: string;
}

const ClientSideGatherings = ({
  initialGatheringList,
  createdBy,
}: ClientSideGatheringsProps) => {
  const { gatheringsList, isLoading, hasMore, loadMore, isError, error } =
    useUserCreated(initialGatheringList, createdBy);

  useEffect(() => {
    if (isError) {
      toast.error(error?.message || '오류가 발생했습니다.');
    }
  }, [isError, error]);

  const { ref, inView } = useInView({ threshold: 1.0 });

  useEffect(() => {
    if (inView && hasMore) {
      loadMore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, hasMore]);

  return (
    <>
      <GatheringList dataList={gatheringsList.pages.flat()} />
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
