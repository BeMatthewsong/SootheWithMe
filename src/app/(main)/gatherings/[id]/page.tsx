/**
 * TODO:
 *  - 주최자인 경우 Bottom Floating 버튼 수정
 *  - 비로그인인 경우 로그인이 필요하다는 모달
 */

'use client';

import { useState } from 'react';
import Image from 'next/image';

import { IconAlarm } from '@/public/icons';
import InformationCard from '@/app/components/InformationCard/InformationCard';
import Review from '@/app/components/Review/Review';
import BottomFloatingBar from '@/app/components/BottomFloatingBar/BottomFloatingBar';
import Pagination from '@/app/components/Pagination/Pagination';

import {
  MOCK_PARTICIPANTS,
  MOCK_REVIEWS,
  MOCKUSER,
  PARTICIPANTS,
} from '../mockData/mockData';

const REVIEWS_PER_PAGE = 4;

const GatheringsDetailPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(MOCK_REVIEWS.length / REVIEWS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
  const currentReviews = MOCK_REVIEWS.slice(
    startIndex,
    startIndex + REVIEWS_PER_PAGE,
  );

  return (
    <>
      <div className='mx-auto max-w-[1200px]'>
        <div className='min-h-screen bg-var-gray-50 px-16 pb-60 pt-24 md:px-24 md:pt-40 lg:px-100'>
          {/* 사진, Information Card */}
          <div className='flex flex-col items-center gap-y-16 md:flex md:flex-row md:gap-x-[14px] md:gap-y-0 lg:gap-x-24'>
            <div className='relative h-[270px] w-full md:w-[50vw] lg:max-w-[486px]'>
              <Image
                className='rounded-[20px] object-cover'
                src='/images/mock-image.png'
                alt='review image'
                fill
                quality={85}
                sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw'
              />
              <div className='absolute right-0 top-0 flex items-center gap-4 rounded-bl-[12px] rounded-tr-[20px] bg-orange-600 py-2 pl-4 pr-6 text-xs font-medium text-var-white'>
                <IconAlarm width='24' height='24' />
                <span className='text-12 font-semibold'>오늘 21시 마감</span>
              </div>
            </div>
            <div className='h-[270px] w-[calc(100vw-32px)] md:w-[50vw] lg:w-full'>
              <InformationCard
                title='달램핏 오피스 스트레칭'
                address='을지로 3가 서울시 중구 청계천로 100'
                date='1월 7일'
                time='17:30'
                participants={PARTICIPANTS}
                maxParticipants={20}
              />
            </div>
          </div>

          {/* 리뷰 */}
          <div className='mt-24 border-t-2 p-24'>
            <div className='text-[18px] font-semibold'>
              이용자들은 이 프로그램을 이렇게 느꼈어요!
            </div>
            <div className='divide-y divide-dashed'>
              {/* 리뷰가 없는 경우 */}
              {/* <div className='flex h-[400px] items-center justify-center'>
                <p className='text-center text-14 font-medium text-var-gray-500'>
                  아직 리뷰가 없어요.
                </p>
              </div> */}

              {/* 리뷰가 있는 경우 */}
              {currentReviews.map((MOCK_REVIEWS, index) => (
                <div key={index} className='pb-16 pt-16'>
                  <Review
                    rating={MOCK_REVIEWS.rating}
                    description={MOCK_REVIEWS.description}
                    user_name={MOCK_REVIEWS.user_name}
                    date={MOCK_REVIEWS.date}
                  />
                </div>
              ))}
            </div>

            {/* 페이지네이션 */}
            {/* TODO: 리뷰가 있는 경우에만 보여주기 */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>

      {/* Bottom Floating Bar */}
      <BottomFloatingBar
        user={MOCKUSER}
        createdBy={2024}
        participantCount={1}
        capacity={5}
        registrationEnd='2024'
        canceledAt='2024'
        participantsData={MOCK_PARTICIPANTS}
      />
    </>
  );
};

export default GatheringsDetailPage;
