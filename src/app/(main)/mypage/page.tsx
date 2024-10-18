import { Metadata } from 'next';
import MyGatheringList from './_component/MyGatheringList';
import getMyGatherings from '@/app/api/actions/gatherings/getMyGatherings';
import { getUserData } from '@/app/api/actions/mypage/getUserData';
import { pageMetadata } from '@/utils/makeMetadata';

export const metadata: Metadata = pageMetadata('나의 모임', '/mypage');

const Mygatherings = async () => {
  const myGatherings = await getMyGatherings();
  const user = await getUserData();
  return <MyGatheringList initData={myGatherings} user={user} />;
};

export default Mygatherings;
