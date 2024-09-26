import { ReviewScoreType } from '@/types/data.type';
import AverageRating from './AverageRating';
import Scores from './Scores';

interface ReviewScoreProps {
  initialScore: ReviewScoreType[];
}
const ReviewScore = ({ initialScore }: ReviewScoreProps) => {
  return (
    <div className='flex items-center justify-center border-y-2 border-var-gray-200 bg-white p-32'>
      <div className='flex w-full items-center justify-between gap-24 md:w-auto md:gap-120 lg:w-612'>
        <AverageRating ratingData={initialScore} />
        <Scores ratingData={initialScore} />
      </div>
    </div>
  );
};

export default ReviewScore;
