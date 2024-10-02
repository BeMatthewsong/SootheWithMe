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
import { useSavedGatheringList } from '@/context/SavedGatheringContext';

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
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // 로컬스토리지
  // const { savedGatherings, updateGathering } = useSavedGatheringList();
  // TODO : 모임 ID를 받아 해당 모임을 찜한 상태인지 확인
  // const isSaved = (id: number) => savedGatherings.includes(id);


  const handleToggleSave = () => {
    setIsSaved((prev) => !prev);
    // TODO : 모임 ID를 받아 스토리지 업데이트
    // updateGathering(id);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
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
          className='group relative'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className='z-base flex h-28 w-28 items-center justify-center rounded-full bg-gray-200 text-14 font-semibold'>
            +{participantCount - maxVisible}
          </div>

          <div
            className={`absolute left-0 top-full ml-12 mt-2 flex w-max -space-x-6 transition-opacity duration-300 ${
              isHovered
                ? 'translate-y-0 opacity-100'
                : 'translate-y-4 opacity-0'
            }`}
          >
            {participants.slice(maxVisible).map(({ User }) => (
              <Avatar
                key={User.id}
                id={User.id}
                name={User.name}
                image={User.image}
                className={`h-28 w-28 transition-transform duration-300 ${isHovered ? 'translate-y-0' : 'translate-y-4'}`}
              />
            ))}
          </div>
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
