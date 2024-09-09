'use client';

import Button from '../Button/Button';
//@todo 함수 기능 구현
import { onCancel, onShare, onJoin, onWithdraw } from './Mock';

interface Participant {
  User: {
    id: number;
  };
}

// @todo api 연결 후 Props 수정
interface ParticipationButtonProps {
  isHost: boolean;
  user: { name: string; id: number };
  participantCount: number;
  capacity: number;
  registrationEnd: string;
  canceledAt: null | string;
  participantsData: Participant[];
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
  const isFull = participantCount === capacity; //참여인원이 가득찼는지 검사
  const isRegistrationEnded = new Date() > new Date(registrationEnd); // 마감일이 지났는지 검사
  const hasParticipated = participantsData.some(
    (participant) => participant.User.id === user.id,
  ); //이미 참여했는지 검사
  const isCancelled = Boolean(canceledAt); //취소되었는지 검사

  const isParticipationDisabled = isFull || isRegistrationEnded || isCancelled; // 참여 가능 여부 검사

  const buttonName = hasParticipated ? '참여 취소하기' : '참여하기'; //버튼 이름
  const buttonVariant = hasParticipated // 버튼 Variant
    ? 'white'
    : isParticipationDisabled
      ? 'gray'
      : 'default';
  const buttonAction = hasParticipated ? onWithdraw : onJoin; // 함수 결정

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
    const disabled = isRegistrationEnded || isCancelled; // 마감일이 지났거나 취소되었을 경우 button 비활성화
    return (
      <div className='flex w-[330px] gap-[10px]'>
        {renderButton('취소하기', 'white', onCancel, disabled)}
        {renderButton('공유하기', 'default', onShare, disabled)}
      </div>
    );
  }

  return renderButton(
    buttonName,
    buttonVariant,
    buttonAction,
    isParticipationDisabled, // disable 여부
  );
};

export default ParticipationButton;
