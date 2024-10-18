'use client';

import postReviews from '@/app/api/actions/reviews/postReviews';
import { ChangeEvent, MouseEvent, useState } from 'react';
import toast from 'react-hot-toast';
import Button from '../Button/Button';
import ModalFrame from './ModalFrame';
import ModalHeader from './ModalHeader';
import CommentReview from './ReviewModal/CommentReview';
import HeartReview from './ReviewModal/HeartReview';
import { useRouter } from 'next/navigation';

interface ReviewModalProps {
  gatheringId: number;
  onClose: () => void;
}

const ReviewModal = ({ gatheringId, onClose }: ReviewModalProps) => {
  const [comment, setComment] = useState<string>('');
  const [score, setScore] = useState<number>(0);

  const router = useRouter();

  const handleChangeReviewComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = async () => {
    const { success, message } = await postReviews({
      gatheringId,
      score,
      comment,
    });

    if (!success) {
      toast.error(message);
      onClose();
      return;
    }

    onClose();
    router.push(`/mypage/review/written`);
    toast.success(message);
  };

  return (
    <ModalFrame onClose={onClose}>
      <div
        onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        className='flex max-h-408 w-344 flex-col gap-24 rounded-xl bg-var-white p-24 md:w-520 dark:border dark:border-neutral-600 dark:bg-neutral-800'
      >
        {/* 헤더 */}
        <ModalHeader title={'리뷰 쓰기'} onClose={onClose} />

        {/* 하트 리뷰 */}
        <HeartReview score={score} setScore={setScore} />

        {/* 리뷰 코멘트 */}
        <CommentReview comment={comment} onChange={handleChangeReviewComment} />

        {/* 버튼 그룹 */}
        <div className='flex items-center gap-16'>
          <Button name='취소' variant='white' onClick={onClose} />
          <Button
            name='리뷰 등록'
            type='button'
            variant={score !== 0 && comment ? 'default' : 'gray'}
            disabled={score === 0 || comment.length === 0}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </ModalFrame>
  );
};

export default ReviewModal;
