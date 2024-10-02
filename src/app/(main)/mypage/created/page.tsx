import { getUserData } from '@/app/api/actions/mypage/getUserData';
import ClientSideGatherings from './_component/ClientSideGatherings';
import getGatherings from '@/app/api/actions/gatherings/getGatherings';
import { redirect } from 'next/navigation';

const CreatedPage = async () => {
  const userData = await getUserData();

  if (!userData) {
    redirect('/signin');
  }

  const gatherings = await getGatherings({
    createdBy: String(userData.id),
  });

  return (
    <>
      {gatherings.length > 0 ? (
        <ClientSideGatherings
          createdBy={String(userData.id)}
          gatherings={gatherings}
        />
      ) : (
        <div className='flex grow items-center justify-center text-14 font-medium text-var-gray-500'>
          아직 만든 모임이 없어요
        </div>
      )}
    </>
  );
};

export default CreatedPage;
