import { ChangeEvent } from 'react';
import InputText from '../../Input/InputText';

interface CommentReviewProps {
  comment: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const CommentReview = ({ comment, onChange }: CommentReviewProps) => {
  return (
    <div className='flex flex-col gap-12'>
      <h2 className='text-16 font-semibold'>경험에 대해 남겨주세요.</h2>
      <InputText
        value={comment}
        onChange={onChange}
        className='placeholder:text-balanc min-h-120 bg-var-gray-50 text-16 font-medium text-var-gray-900 placeholder-var-gray-400 dark:text-neutral-50'
        placeholder='남겨주신 리뷰는 프로그램 운영 및 다른 회원 분들께 큰 도움이 됩니다.'
      />
    </div>
  );
};

export default CommentReview;
