import { getUserData } from '@/app/api/actions/mypage/getUserData';
import ClientSideGatherings from './_component/ClientSideGatherings';
import getGatherings from '@/app/api/actions/gatherings/getGatherings';
import { redirect } from 'next/navigation';
import { SORT_OPTIONS_MAP } from '@/constants/common';

const CreatedPage = async () => {
  const userData = await getUserData();

  if (!userData) {
    redirect('/signin');
  }

  const gatherings = await getGatherings({
    createdBy: String(userData.id),
    sortBy: SORT_OPTIONS_MAP['최신순'],
    sortOrder: 'desc',
  });

  return (
    <>
      {gatherings.length > 0 ? (
        <ClientSideGatherings
          createdBy={String(userData.id)}
          initialGatheringList={gatherings}
        />
      ) : (
        <div className='flex grow items-center justify-center text-14 font-medium text-var-gray-500 dark:text-neutral-200'>
          아직 만든 모임이 없어요
        </div>
      )}
    </>
  );
};

export default CreatedPage;
