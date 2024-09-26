'use client';

import getGatherings from '@/app/api/actions/gatherings/getGatherings';
import GatheringList from './_component/GatheringList';
import { GatheringsListData } from '@/types/data.type';
import { useUser } from '@/app/(auth)/context/UserContext';
import { useEffect, useState } from 'react';
import { set } from 'zod';
import { DATA_LIST } from './mockData';

const CreatedPage = () => {
  const { user } = useUser();
  const [gatheringsList, setGatheringsList] = useState<GatheringsListData[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGatheringsData = async () => {
      if (user) {
        setIsLoading(true);

        try {
          const gatherings = await getGatherings({ createdBy: user.id });
          setGatheringsList(gatherings);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setIsLoading(false); // 요청이 끝나면 로딩 상태 해제
        }
      }
    };

    fetchGatheringsData();
  }, [user]);

  return (
    <>
      {isLoading ? (
        <div className='flex grow items-center justify-center text-14 font-medium text-var-gray-500'>
          모임 정보를 불러오고 있어요...
        </div>
      ) : gatheringsList.length > 0 ? (
        <GatheringList dataList={gatheringsList} />
      ) : (
        <div className='flex grow items-center justify-center text-14 font-medium text-var-gray-500'>
          아직 만든 모임이 없어요
        </div>
      )}
    </>
  );
};

export default CreatedPage;
