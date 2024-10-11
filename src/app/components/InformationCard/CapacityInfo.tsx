import ProgressBar from '../ProgressBar/ProgressBar';
import { MIN_PARTICIPANTS } from '@/constants/common';

interface CapacityInfoProps {
  participantCount: number;
  maxParticipants: number;
}

const CapacityInfo = ({
  participantCount,
  maxParticipants,
}: CapacityInfoProps) => {
  return (
    <div>
      <ProgressBar
        participantNumber={participantCount}
        hasParticipantNumber={false}
        hasOpeningConfirmed={false}
        capacity={maxParticipants}
        hasText={false}
      />

      <div className='mt-10 flex justify-between text-12 font-semibold text-var-gray-700 dark:text-neutral-200'>
        <div>최소 인원 {MIN_PARTICIPANTS}명</div>
        <div className='text-var-orange-500'>최대 인원 {maxParticipants}명</div>
      </div>
    </div>
  );
};

export default CapacityInfo;
