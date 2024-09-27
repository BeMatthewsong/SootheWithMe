'use client';

import { useState } from 'react';

import BottomFloatingBar from '@/app/components/BottomFloatingBar/BottomFloatingBar';
import GatheringImage from './GatheringImage';
import GatheringInfo from './GatheringInfo';
import GatheringReviews from './GatheringReviews';
import {
  GatheringInfoType,
  GatheringParticipantsType,
  ReviewsType,
} from '@/types/data.type';
import { useUser } from '@/app/(auth)/context/UserContext';

interface GatheringDetailProps {
  gatheringInfo: GatheringInfoType;
  gatheringParticipants: GatheringParticipantsType[];
  reviews: ReviewsType[];
}

const GatheringDetail = ({
  gatheringInfo,
  gatheringParticipants,
  reviews,
}: GatheringDetailProps) => {
  const { user } = useUser();

  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className='mx-auto max-w-[1200px]'>
        <div className='min-h-screen bg-var-gray-50 px-16 pb-60 pt-24 md:px-24 md:pt-40 lg:px-100'>
          {/* 사진, Information Card */}
          <div className='flex flex-col items-center gap-y-16 md:flex md:flex-row md:gap-x-[14px] md:gap-y-0 lg:gap-x-24'>
            <GatheringImage image={gatheringInfo.image} />
            <GatheringInfo
              name='테스트'
              location={gatheringInfo.location}
              dateTime={gatheringInfo.dateTime}
              participantCount={gatheringInfo.participantCount}
              capacity={gatheringInfo.capacity}
              participants={gatheringParticipants}
            />
          </div>

          {/* 리뷰 */}
          <GatheringReviews
            reviews={reviews}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>

      {/* Bottom Floating Bar */}
      <BottomFloatingBar
        user={user}
        createdBy={gatheringInfo.createdBy}
        participantCount={gatheringInfo.participantCount}
        capacity={gatheringInfo.capacity}
        registrationEnd={gatheringInfo.registrationEnd}
        canceledAt={gatheringInfo.canceledAt}
        participantsData={gatheringParticipants}
      />
    </>
  );
};

export default GatheringDetail;
