'use client';

import Card from '@/app/components/Card/Card';
import { GatheringType } from '@/types/data.type';
import Link from 'next/link';

interface GatheringListProps {
  dataList: GatheringType[];
}

const GatheringList = ({ dataList }: GatheringListProps) => {
  const updateDataList = () => {
    return dataList.map((item) => ({
      ...item,
      canceledAt: null,
    }));
  };

  const handleSaveDiscard = () => {
    throw new Error('잘못된 접근입니다.');
  };

  return (
    <div className='grow'>
      {updateDataList().map((data) => (
        <Link key={data.id} href={`/gatherings/${data.id}`}>
          <Card handleSaveDiscard={handleSaveDiscard} data={data}>
            <Card.Info />
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default GatheringList;
