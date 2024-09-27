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
import { GatheringParticipantsType } from '@/types/data.type';
import { MIN_PARTICIPANTS } from '@/constants/common';
import { formatDate, formatTimeColon } from '@/utils/formatDate';

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
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleToggleSave = () => {
    setIsSaved((prev) => !prev);
  };

  // function of setting Avatars with remaining
  const renderAvatars = () => {
    const maxVisible = 4;
    const visibleAvatars = participants
      .slice(0, maxVisible)
      .map(({ User }) => (
        <Avatar
          key={User.id}
          id={User.id}
          name={User.name}
          image={User.image}
          className='h-28 w-28'
        />
      ));

    if (participantCount > maxVisible) {
      visibleAvatars.push(
        <div
          key='remaining'
          className='z-base flex h-28 w-28 items-center justify-center rounded-full bg-gray-200 text-14 font-semibold'
        >
          +{participantCount - maxVisible}
        </div>,
      );
    }

    return visibleAvatars;
  };

  return (
    <div className='h-full w-full divide-y divide-dashed rounded-[24px] border p-6 text-var-gray-900'>
      <div className='pb-44'>
        <div className='flex justify-between'>
          <div>
            <div className='text-[18px] font-semibold' data-testid='title'>
              {title}
            </div>
            <div className='text-[14px] font-medium' data-testid='address'>
              {address}
            </div>
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
          <InfoChip type='date' data-testid='date'>
            {formatDate(date)}
          </InfoChip>
          <InfoChip type='time' data-testid='time'>
            {formatTimeColon(time)}
          </InfoChip>
        </div>
      </div>

      {/* 모집 정원 */}
      <div className='pt-6'>
        <div className='flex justify-between'>
          <div className='flex items-center'>
            <div className='text-14 font-semibold'>
              모집 정원 {participantCount}명
            </div>
            <div className='ml-12 flex -space-x-6'>{renderAvatars()}</div>
          </div>
          <div className='flex items-center'>
            {participantCount >= MIN_PARTICIPANTS && (
              <>
                <IconCheckCircle />
                <div className='text-14 font-medium text-var-orange-500'>
                  개설확정
                </div>
              </>
            )}
          </div>
        </div>

        {/* progress bar */}
        <ProgressBar
          participantNumber={participantCount}
          hasParticipantNumber={false}
          hasOpeningConfirmed={false}
          capacity={maxParticipants}
          hasText={false}
        />

        <div className='mt-10 flex justify-between text-12 font-semibold'>
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
