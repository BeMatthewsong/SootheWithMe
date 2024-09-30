'use client';

import { useEffect, useState } from 'react';

import { IconArrow, IconCheckCircle, IconPerson } from '@/public/icons';

/**
 * ProgressBar component
 * @param {number} participantNumber - 참여 인원 수
 * @param {boolean} hasParticipantNumber - 참여 인원 수 렌더링 여부
 * @param {boolean} hasOpeningConfirmed - 개설 확정 렌더링 여부
 * @param {boolean} hasText - 우측 텍스트 (join now 혹은 Closed) 렌더링 여부
 */

interface ProgressBarProps {
  participantNumber: number;
  capacity: number;
  hasParticipantNumber: boolean;
  hasOpeningConfirmed: boolean;
  hasText: boolean;
}

const ProgressBar = ({
  participantNumber = 0,
  capacity = 20,
  hasParticipantNumber = true,
  hasOpeningConfirmed = true,
  hasText = true,
}: ProgressBarProps) => {
  const [currentWidth, setCurrentWidth] = useState<number>(0); // 애니메이션 적용할 progress bar width

  const isOpeningConfirmed = participantNumber >= 5; // 개설 확정 여부 (boolean)
  const isClosedGathering = participantNumber === capacity; // 참여 인원이 다 찬 경우 (boolean)

  useEffect(() => {
    const progress = (participantNumber / capacity) * 100;
    const timeout = setTimeout(() => {
      setCurrentWidth(progress);
    }, 100);

    return () => clearTimeout(timeout);
  }, [participantNumber, capacity]);

  if (participantNumber < 0 || capacity < 0) return null;

  return (
    <div className='flex gap-24' data-testid='progress-bar'>
      <div className='flex w-full flex-col gap-12'>
        {/* gathering information */}
        <div className='flex items-center gap-8'>
          {/* 참가 인원 렌더링 선택 */}
          {hasParticipantNumber && (
            <div
              className={`flex items-center gap-[2px] text-14 font-medium ${isClosedGathering ? 'text-var-orange-400' : 'text-var-black'}`}
              data-testid='number-of-participant'
            >
              <IconPerson className='h-16 w-16' />
              {`${participantNumber} / ${capacity}`}
            </div>
          )}
          {/* 개설확정 렌더링 선택 */}
          {hasOpeningConfirmed && isOpeningConfirmed && !isClosedGathering && (
            <div
              className='flex items-center gap-4 text-14 text-var-orange-400'
              data-testid='opening-confirmed-badge'
            >
              <IconCheckCircle className='h-24 w-24' />
              개설확정
            </div>
          )}
        </div>
        {/* progress bar */}
        <div className='flex h-4 w-full rounded-md bg-var-orange-100'>
          <div
            className={`h-full ${
              isClosedGathering ? 'bg-var-orange-400' : 'bg-var-orange-600'
            } transition-all duration-500 ease-in-out`}
            style={{ width: `${currentWidth}%` }}
            data-testid='colored-progress-bar'
          ></div>
        </div>
      </div>
      {/* user action */}
      {isClosedGathering ? (
        <div
          className={`${hasText ? 'block' : 'hidden'} flex items-center text-16 font-semibold text-var-orange-400`}
        >
          Closed
        </div>
      ) : (
        <div
          className={`${hasText ? 'block' : 'hidden'} flex items-center gap-8 whitespace-nowrap text-16 font-semibold text-var-orange-600`}
        >
          join now
          <IconArrow className='h-[18px] w-[18px]' />
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
