import { IconHeart } from '@/public/icons';

interface HeartReviewProps {
  score: number;
  setScore: (score: number) => void;
}

const HeartReview = ({ score, setScore }: HeartReviewProps) => {
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
  return (
    <div className='flex flex-col gap-12'>
      <h2 className='text-16 font-semibold'>만족스러운 경험이었나요?</h2>
      <div className='flex gap-2'>{ratingStarHandler()}</div>
    </div>
  );
};

export default HeartReview;
