import { IconHeart } from '@/public/icons';
import { ReviewScoreType } from '@/types/data.type';
import { useEffect, useState } from 'react';

interface AverageRatingProps {
  rating: ReviewScoreType[];
}

const AverageRating = ({ rating }: AverageRatingProps) => {
  const averageScore = rating.length > 0 ? rating[0].averageScore : 0.0;

  const [width, setWidth] = useState(0);
  const [opacity, setOpacity] = useState(0.5);

  useEffect(() => {
    const animationTimeout = setTimeout(() => {
      setWidth(averageScore * 20);
      setOpacity(1);
    }, 5);

    return () => {
      clearTimeout(animationTimeout);
    };
  }, [averageScore]);

  return (
    <div>
      <p className='text-center text-24 font-semibold text-var-gray-400 dark:text-neutral-400'>
        <span className='mr-2 text-var-gray-900 dark:text-white'>
          {averageScore}
        </span>
        / 5
      </p>
      <div className='relative flex gap-[2px] text-var-gray-200 dark:text-neutral-500'>
        {Array(5)
          .fill(null)
          .map((_, index) => (
            <IconHeart key={index} className='size-24 shrink-0' />
          ))}
        <div
          className='absolute left-0 top-0 flex gap-[2px] overflow-hidden text-var-orange-600 transition-all duration-500'
          style={{ width: `${width}%`, opacity: opacity }}
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
