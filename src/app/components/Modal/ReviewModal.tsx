'use client';

import { IconHeart, IconX } from '@/public/icons';
import { ChangeEvent, MouseEvent, useState } from 'react';
import Button from '../Button/Button';
import InputText from '../Input/InputText';
import ModalFrame from './ModalFrame';
import postReviews from '@/app/api/actions/reviews/postReviews';

interface ReviewModalProps {
  gatheringId: number;
  onClose: () => void;
}

// TODO: 나중에 개별 컴포넌트로 분리
const ReviewModal = ({ gatheringId, onClose }: ReviewModalProps) => {
  const [comment, setComment] = useState<string>('');
  const [score, setScore] = useState<number>(0);

  const handleChangeReviewComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const ratingStarHandler = (): JSX.Element[] => {
    let result: JSX.Element[] = [];
    for (let i: number = 0; i < 5; i++) {
      result.push(
        <span key={i + 1} onClick={() => setScore(i + 1)}>
          {i + 1 <= score ? (
            <IconHeart className='h-24 w-24 cursor-pointer text-var-orange-600 transition-all duration-100 ease-in-out' />
          ) : (
            <IconHeart className='h-24 w-24 cursor-pointer text-gray-200 transition-all duration-100 ease-in-out' />
          )}
        </span>,
      );
    }
    return result;
  };

  const handleSubmit = async () => {
    await postReviews({ gatheringId, score, comment });
    onClose();
    alert('리뷰가 등록되었습니다.');
  };

  return (
    <ModalFrame onClose={onClose}>
      <div
        onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        className='flex max-h-408 w-344 flex-col gap-24 rounded-xl bg-var-white p-24 md:w-520'
      >
        {/* 헤더 */}
        <div className='flex items-center justify-between'>
          <h1 className='text-18 font-semibold text-var-gray-900'>리뷰 쓰기</h1>
          <button onClick={onClose}>
            <IconX className='h-24 w-24' />
          </button>
        </div>
        {/* 하트 리뷰 */}
        <div className='flex flex-col gap-12'>
          <h2 className='text-16 font-semibold'>만족스러운 경험이었나요?</h2>
          <div className='flex gap-2'>{ratingStarHandler()}</div>
        </div>
        {/* 리뷰 코멘트 */}
        <div className='flex flex-col gap-12'>
          <h2 className='text-16 font-semibold'>경험에 대해 남겨주세요.</h2>
          <InputText
            value={comment}
            onChange={handleChangeReviewComment}
            className='min-h-120 bg-var-gray-50 text-16 font-medium text-var-gray-900 placeholder-var-gray-400 placeholder:text-balance'
            placeholder='남겨주신 리뷰는 프로그램 운영 및 다른 회원 분들께 큰 도움이 됩니다.'
          />
        </div>
        {/* 버튼 그룹 */}
        <div className='flex items-center gap-16'>
          <Button name='취소' variant='white' onClick={onClose} />
          <Button
            name='리뷰 등록'
            variant={score !== 0 && comment ? 'default' : 'gray'}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </ModalFrame>
  );
};

export default ReviewModal;
