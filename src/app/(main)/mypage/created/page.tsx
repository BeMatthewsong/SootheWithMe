'use client';

import Card from '@/app/components/Card/Card';
import { DATA_LIST } from './mockData';

const CreatedPage = () => {
  const handleSaveDiscard = () => {
    // TODO : 스토리지 삭제 로직 추가
    console.log('스토리지 삭제 버튼 클릭');
  };

  return (
    <div className='grow'>
      {DATA_LIST.map((data) => (
        <Card key={data.id} handleSaveDiscard={handleSaveDiscard} data={data}>
          <Card.Info />
        </Card>
      ))}
    </div>
    // 내가 만든 모임이 없을 경우
    // <div className='flex grow items-center justify-center text-14 font-medium text-var-gray-500'>
    //   아직 만든 모임이 없어요
    // </div>
  );
};

export default CreatedPage;
