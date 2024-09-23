import { Metadata } from 'next';
import MyGatheringList from './_component/MyGatheringList';

export const metadata: Metadata = {
  title: '나의 모임 | Soothe With Me',
  description: 'Soothe With Me 나의 모임 페이지입니다.',
};

const Mygatherings = () => {
  return <MyGatheringList />;
};

export default Mygatherings;
