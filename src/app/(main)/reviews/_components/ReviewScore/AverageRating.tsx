import { IconHeart } from '@/public/icons';
import { ReviewScoreType } from '@/types/data.type';
import { calculateAverageRating } from './calculates';

interface AverageRatingProps {
  ratingData: ReviewScoreType[];
}

const AverageRating = ({ ratingData }: AverageRatingProps) => {
  const rating = calculateAverageRating(ratingData); // 평균 점수
  const width = parseFloat(rating) * 20; // 평균값으로 width 계산

  return (
    <div>
      <p className='text-center text-24 font-semibold text-var-gray-400'>
        <span className='mr-2 text-var-gray-900'>{rating}</span>/ 5
      </p>
      <div className='relative flex gap-[2px] text-var-gray-200'>
        {Array(5)
          .fill(null)
          .map((_, index) => (
            <IconHeart key={index} className='size-24 shrink-0' />
          ))}
        <div
          className='absolute left-0 top-0 flex gap-[2px] overflow-hidden text-var-orange-600'
          style={{ width: `${width}%` }}
        >
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <IconHeart key={index} className='size-24 shrink-0' />
            ))}
        </div>
      </div>
    </div>
  );
};

export default AverageRating;
