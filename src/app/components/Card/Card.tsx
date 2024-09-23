import {
  IconPerson,
  IconSaveDiscard,
  IconSaveDiscardBtn,
} from '@/public/icons';
import Image from 'next/image';
import Button from '@/app/components/Button/Button';
import StateChip from '@/app/components/Chip/StateChip';
import { formatDate, formatTime } from '@/utils/formatDate';
import { UserJoinedGatheringsData } from '@/types/data.type';

interface CardProps {
  data: UserJoinedGatheringsData;
  hasButton?: boolean;
  hasChips?: boolean;
  handleCancelGatherings?: () => void; // 예약 취소 버튼 클릭 핸들러
  handleWriteReview?: () => void; // 리뷰 작성 버튼 클릭 핸들러
  handleSaveDiscard?: () => void; // 모임 스토리지 삭제 핸들러
}

const Card = ({
  data,
  hasButton,
  hasChips,
  handleCancelGatherings,
  handleWriteReview,
  handleSaveDiscard,
}: CardProps) => {
  // Button 렌더링
  const button = () => {
    if (!data.isCompleted) {
      return (
        <Button
          type='button'
          name='예약 취소하기'
          variant='white'
          onClick={handleCancelGatherings}
        />
      );
    }
    if (data.isCompleted && !data.isReviewed) {
      return (
        <Button
          type='button'
          name='리뷰 작성하기'
          variant='default'
          onClick={handleWriteReview}
        />
      );
    }
    return null;
  };

  // State chip 렌더링
  const chips = () => {
    // 이용 완료 시
    if (data.isCompleted) {
      return <StateChip state='done' />;
    }

    // 참가 인원이 5명 이상인 경우 개설 확정
    const MIN_PARTICIPANTS = 5;
    const isConfirmed = data.participantCount >= MIN_PARTICIPANTS;
    return (
      <>
        {/* 이용 예정 */}
        <StateChip state='scheduled' />
        {/* 개설 확정 || 개설 대기 */}
        <StateChip state={isConfirmed ? 'confirmed' : 'pending'} />
      </>
    );
  };

  return (
    <div className='w-full border-b-2 border-dashed border-var-gray-200 py-24'>
      <div className='relative flex w-full flex-col gap-16 overflow-hidden rounded-xl md:flex-row md:rounded-3xl'>
        {/* 이미지 */}
        <div className='relative flex h-156 w-full flex-col gap-16 md:w-280'>
          <Image
            className='rounded-3xl object-cover'
            src={data.image}
            alt='image'
            fill
            quality={85}
            sizes='(max-width: 768px) 100vw, 378px'
          />
        </div>

        {/* 정보 */}
        <div className='flex flex-col gap-[6px] p-2'>
          {/* StateChip이 있는 경우 */}
          {hasChips && <div className='mb-[6px] flex gap-8'>{chips()}</div>}

          <div className='flex items-center gap-8 text-18 font-semibold text-var-gray-900'>
            <p>{data.name}</p>
            <span>|</span>
            <p className='text-14 font-medium text-var-gray-700'>
              {data.location}
            </p>
          </div>
          <div className='flex items-center gap-4 text-14 font-medium text-var-gray-700'>
            <p>{formatDate(data.dateTime)}</p>
            <span>·</span>
            <p>{formatTime(data.dateTime)}</p>
            <IconPerson className='ml-8 h-16 w-16' />
            <p>
              {data.participantCount}/{data.capacity}
            </p>
          </div>

          {/* 버튼이 있는 경우 */}
          {hasButton && <div className='mt-12 w-120'>{button()}</div>}
        </div>

        {/* 취소된 모임의 경우 */}
        {data.canceledAt && (
          <div className='absolute left-0 top-0 z-base flex h-full w-full flex-col items-center justify-center bg-var-black bg-opacity-80'>
            <p className='text-14 font-medium text-white'>
              모집 취소된 모임이에요.
              <br />
              다음 기회에 만나요 🙏
            </p>
            <button
              type='button'
              data-testid='save-discard-button'
              className='right-24 mt-24 md:absolute md:top-24 md:mt-0'
              onClick={handleSaveDiscard}
            >
              <IconSaveDiscardBtn className='h-36 w-116 md:hidden' />
              <IconSaveDiscard className='hidden h-48 w-48 md:block' />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
