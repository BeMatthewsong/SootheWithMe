import Avatars from './Avatars';
import { IconCheckCircle } from '@/public/icons';
import { GatheringParticipantsType } from '@/types/data.type';
import { MIN_PARTICIPANTS } from '@/constants/common';

interface ParticipantsInfoProps {
  participants: GatheringParticipantsType[];
  participantCount: number;
}

const ParticipantsInfo = ({
  participants,
  participantCount,
}: ParticipantsInfoProps) => {
  return (
    <div className='flex justify-between'>
      <div className='flex items-center'>
        <div className='text-14 font-semibold'>
          현재 인원 {participantCount}명
        </div>
        <div className='ml-12 flex -space-x-6'>
          <Avatars
            participants={participants}
            participantCount={participantCount}
          />
        </div>
      </div>

      {/* 개설 확정 여부 */}
      {participantCount >= MIN_PARTICIPANTS && (
        <div className='flex items-center'>
          <IconCheckCircle />
          <div className='text-14 font-medium text-var-orange-500'>
            개설확정
          </div>
        </div>
      )}
    </div>
  );
};

export default ParticipantsInfo;
