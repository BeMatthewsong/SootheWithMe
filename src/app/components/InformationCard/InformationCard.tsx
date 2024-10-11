'use client';

import { useParams } from 'next/navigation';

import { GatheringParticipantsType } from '@/types/data.type';
import InformationCardHeader from './InformationCardHeader';
import DateTimeChips from './DateTimeChips';
import ParticipantsInfo from './ParticipantsInfo';
import CapacityInfo from './CapacityInfo';

interface InformationCardProps {
  title: string;
  address: string;
  date: string;
  time: string;
  participants: GatheringParticipantsType[];
  participantCount: number;
  maxParticipants: number;
}

const InformationCard = ({
  title,
  address,
  date,
  time,
  participants,
  participantCount,
  maxParticipants,
}: InformationCardProps) => {
  const params = useParams();
  const gatheringId = Number(params.id);

  return (
    <div className='h-full w-full divide-y divide-dashed rounded-[24px] border p-6 dark:divide-neutral-600 dark:border-neutral-700'>
      <div className='pb-44'>
        <InformationCardHeader
          title={title}
          address={address}
          gatheringId={gatheringId}
        />
        <DateTimeChips date={date} time={time} />
      </div>
      <div className='pt-6'>
        <ParticipantsInfo
          participants={participants}
          participantCount={participantCount}
        />
        <CapacityInfo
          participantCount={participantCount}
          maxParticipants={maxParticipants}
        />
      </div>
    </div>
  );
};

export default InformationCard;
