// 개설 확정은 참여 인원수가 최소 인원 수(5명)을 충족한 경우 자동 확정 처리됩니다.
'use client';

import { IconArrow, IconCheckCircle, IconPerson } from '@/public/icons';

/**
 * ProgressBar component
 * @param {number} participantNumber - 참여 인원 수
 * @param {boolean} hasParticipantNumber - 참여 인원 수 렌더링 여부
 * @param {boolean} hasOpeningConfirmed - 개설 확정 렌더링 여부
 */

interface ProgressBarProps {
  participantNumber: number;
  capacity: number;
  hasParticipantNumber: boolean;
  hasOpeningConfirmed: boolean;
}

const ProgressBar = ({
  participantNumber,
  capacity,
  hasParticipantNumber,
  hasOpeningConfirmed,
}: ProgressBarProps) => {
  const isOpeningConfirmed = participantNumber >= 5; // 개설 확정 여부 (boolean)
  const isClosedGathering = participantNumber === capacity; // 참여 인원이 다 찬 경우 (boolean)

  return (
    <div className='flex gap-24'>
      <div className='flex w-full flex-col gap-12'>
        {/* gathering information */}
        <div className='flex items-center gap-8'>
          {/* 참가 인원 렌더링 선택 */}
          {hasParticipantNumber && (
            <div
              className={`text-14 flex items-center gap-[2px] font-medium ${isClosedGathering ? 'text-var-orange-400' : 'text-var-black'}`}
            >
              <IconPerson className='h-16 w-16' />
              {`${participantNumber} / ${capacity}`}
            </div>
          )}
          {/* 개설확정 렌더링 선택 */}
          {hasOpeningConfirmed && isOpeningConfirmed && !isClosedGathering && (
            <div className='text-14 flex items-center gap-4 text-var-orange-400'>
              <IconCheckCircle className='h-24 w-24' />
              개설확정
            </div>
          )}
        </div>
        {/* progress bar */}
        <div className='flex h-4 w-full rounded-md bg-var-orange-100'>
          <div
            className={`h-full ${isClosedGathering ? 'bg-var-orange-400' : 'bg-var-orange-600'} transition-all ease-in-out`}
            style={{ width: `${(participantNumber / capacity) * 100}%` }}
          ></div>
        </div>
      </div>
      {/* user action */}
      {isClosedGathering ? (
        <div className='text-16 flex items-center font-semibold text-var-orange-400'>
          Closed
        </div>
      ) : (
        <div className='text-16 flex items-center gap-8 whitespace-nowrap font-semibold text-var-orange-600'>
          join now
          <IconArrow className='h-[18px] w-[18px]' />
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
