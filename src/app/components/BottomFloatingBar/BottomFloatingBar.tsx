'use client';

import ParticipationButton from './ParticipationButton';
import { userData, groupData, participantsData } from './Mock';

interface Participant {
  User: {
    id: number;
  };
}

interface BottomFloatingBarProps {
  user: { name: string; id: number };
  createdBy: number;
  participantCount: number;
  capacity: number;
  registrationEnd: string;
  canceledAt: null | string;
  participantsData: Participant[];
}

const BottomFloatingBar = ({
  user,
  createdBy,
  participantCount,
  capacity,
  registrationEnd,
  canceledAt,
  participantsData,
}: BottomFloatingBarProps) => {
  const isHost = createdBy === userData.id; //주최자인지 검사

  return (
    <section className='fixed bottom-0 w-full border-t-2 border-var-black bg-var-white px-16 py-20 md:px-24'>
      <div
        className={`flex max-w-[996px] justify-between lg:mx-auto ${isHost && 'flex-col items-center gap-[10px] md:flex-row'}`}
      >
        <div>
          <h2 className='text-14 font-semibold lg:text-16'>
            더 건강한 나와 팀을 위한 프로그램 🏃‍️️
          </h2>
          <p className='text-12 font-medium'>
            국내 최고 웰니스 전문가와 프로그램을 통해 지친 몸과 마음을
            회복해봐요
          </p>
        </div>
        <ParticipationButton
          isHost={isHost}
          user={user}
          participantCount={participantCount}
          capacity={capacity}
          registrationEnd={registrationEnd}
          canceledAt={canceledAt}
          participantsData={participantsData}
        />
      </div>
    </section>
  );
};

export default BottomFloatingBar;
