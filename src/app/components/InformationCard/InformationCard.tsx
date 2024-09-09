'use client';

import { useState } from 'react';

import {
  IconCheckCircle,
  IconSaveActive,
  IconSaveInactive,
} from '@/public/icons';
import Avatar from './Avatar';
import InfoChip from '../Chip/InfoChip';
import ProgressBar from '../ProgressBar/ProgressBar';

// min number of people to confirm opening
const MIN_PARTICIPANTS = 5;

interface InformationCardProps {
  title: string;
  address: string;
  date: string;
  time: string;
  participants: { id: number; name: string; image: string }[];
  maxParticipants: number;
}

const InformationCard = ({
  title,
  address,
  date,
  time,
  participants,
  maxParticipants,
}: InformationCardProps) => {
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleToggleSave = () => {
    setIsSaved((prev) => !prev);
  };

  // function of setting Avatars with remaining
  const renderAvatars = () => {
    const maxVisible = 4;
    const visibleAvatars = participants
      .slice(0, maxVisible)
      .map(({ id, name, image }) => (
        <Avatar
          key={id}
          id={id}
          name={name}
          image={image}
          className='h-28 w-28'
        />
      ));

    if (participants.length > maxVisible) {
      visibleAvatars.push(
        <div
          key='remaining'
          className='z-10 flex h-28 w-28 items-center justify-center rounded-full bg-gray-200 text-14 font-semibold'
        >
          +{participants.length - maxVisible}
        </div>,
      );
    }

    return visibleAvatars;
  };

  return (
    <div className='w-full divide-y divide-dashed p-6 text-var-gray-900'>
      <div className='pb-44'>
        <div className='flex justify-between'>
          <div>
            <div className='text-[18px] font-semibold'>{title}</div>
            <div className='text-[14px] font-medium'>{address}</div>
          </div>

          {/* 찜 */}
          {isSaved ? (
            <IconSaveActive
              className='h-48 w-48 animate-heartPulse cursor-pointer'
              onClick={handleToggleSave}
            />
          ) : (
            <IconSaveInactive
              className='h-48 w-48 cursor-pointer'
              onClick={handleToggleSave}
            />
          )}
        </div>

        {/* 날짜, 시간 chip */}
        <div className='mt-12 space-x-8'>
          <InfoChip type='date'>{date}</InfoChip>
          <InfoChip type='time'>{time}</InfoChip>
        </div>
      </div>

      {/* 모집 정원 */}
      <div className='pt-6'>
        <div className='flex justify-between'>
          <div className='flex items-center'>
            <div className='text-14 font-semibold'>
              모집 정원 {participants.length}명
            </div>
            <div className='ml-12 flex -space-x-6'>{renderAvatars()}</div>
          </div>
          <div className='flex items-center'>
            {participants.length >= MIN_PARTICIPANTS ? (
              <>
                <IconCheckCircle />
                <div className='text-14 font-medium text-var-orange-500'>
                  개설확정
                </div>
              </>
            ) : null}
          </div>
        </div>

        {/* progress bar */}
        <ProgressBar
          participantNumber={participants.length}
          hasParticipantNumber={false}
          hasOpeningConfirmed={false}
          capacity={maxParticipants}
          hasText={false}
        />

        <div className='mt-8 flex justify-between text-12 font-semibold'>
          <div>최소인원 {MIN_PARTICIPANTS}명</div>
          <div className='text-var-orange-500'>
            최대인원 {maxParticipants}명
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationCard;
