'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { UserData } from '@/types/client.type';
import Button from '../Button/Button';
import useCopyUrlToClipboard from '@/hooks/useCopyUrlToClipboard';
import useCancelGathering from '@/hooks/useCancelGathering';
import useParticipation from '@/hooks/useParticipation';
import { GatheringParticipantsType } from '@/types/data.type';
import Popup from '../Popup/Popup';
import CancelGatheringModal from '../Modal/CancelGatheringModal';

interface ParticipationButtonProps {
  isHost: boolean;
  user: UserData | null;
  participantCount: number;
  capacity: number;
  registrationEnd: string;
  canceledAt?: string | null;
  participantsData: GatheringParticipantsType[];
}

const ParticipationButton = ({
  user,
  isHost,
  participantCount,
  capacity,
  registrationEnd,
  canceledAt,
  participantsData,
}: ParticipationButtonProps) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const params = useParams();

  const { copyUrlToClipboard } = useCopyUrlToClipboard();
  const { cancelGathering } = useCancelGathering(Number(params.id));

  const {
    hasParticipated,
    setHasParticipated,
    isShowPopup,
    setIsShowPopup,
    handleJoinClick,
    handleWithdrawClick,
  } = useParticipation(user);

  useEffect(() => {
    if (user) {
      const isParticipated = participantsData.some(
        (participant) => participant.User.id === user.id,
      );
      setHasParticipated(isParticipated);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, participantsData]);

  const isFull = participantCount === capacity; //참여인원이 가득찼는지 검사
  const isRegistrationEnded = new Date() > new Date(registrationEnd); // 마감일이 지났는지 검사
  const isCancelled = Boolean(canceledAt); //취소되었는지 검사
  const isParticipationDisabled = isFull || isRegistrationEnded || isCancelled; // 참여 가능 여부 검사

  const buttonName = hasParticipated ? '참여 취소하기' : '참여하기'; //버튼 이름
  const buttonVariant = hasParticipated // 버튼 Variant
    ? 'white'
    : isParticipationDisabled
      ? 'gray'
      : 'default';

  /* 버튼 렌더링 함수 */
  const renderButton = (
    name: string,
    variant: 'white' | 'default' | 'gray',
    onClick?: () => void,
    disabled = false,
  ) => (
    <div className={`h-44 w-[115px] ${isHost && 'w-full md:w-[115px]'}`}>
      <Button
        name={name}
        type='button'
        onClick={onClick}
        variant={variant}
        disabled={disabled}
      />
    </div>
  );

  // 주최자일 경우
  if (isHost) {
    const disabled = isRegistrationEnded; // 마감일이 지난 경우 버튼 비활성화

    return (
      <>
        <div className='flex w-[330px] gap-[10px]'>
          {renderButton('취소하기', 'white', () => setIsModalOpen(true))}
          {renderButton('공유하기', 'default', copyUrlToClipboard, disabled)}
        </div>
        {isModalOpen && (
          <CancelGatheringModal
            onClick={cancelGathering}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </>
    );
  }

  return (
    <>
      {renderButton(
        buttonName,
        buttonVariant,
        hasParticipated ? handleWithdrawClick : handleJoinClick,
        isParticipationDisabled, // disable 여부
      )}
      {isShowPopup && ( // 팝업 렌더링
        <Popup
          type='login'
          hasCancelButton={true}
          onClickClose={() => setIsShowPopup(false)}
          onClickConfirm={() => {
            setIsShowPopup(false);
            router.push('/signin');
          }}
        />
      )}
    </>
  );
};

export default ParticipationButton;
