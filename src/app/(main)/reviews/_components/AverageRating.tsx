import { IconHeart } from '@/public/icons';
import { RATING_DATA as data } from '../mockData';

const calculateAverageRating = () => {
  // 각 별점 값에 별점 수를 곱한 총합 계산
  const totalScore =
    data.oneStar * 1 +
    data.twoStars * 2 +
    data.threeStars * 3 +
    data.fourStars * 4 +
    data.fiveStars * 5;

  // 전체 별점 개수 합산
  const totalCount =
    data.oneStar +
    data.twoStars +
    data.threeStars +
    data.fourStars +
    data.fiveStars;

  // 총합을 별점 개수로 나눠 평균 계산
  const average = totalCount === 0 ? 0 : totalScore / totalCount;

  return average.toFixed(1); // 소수점 첫째 자리까지 표시
};

const AverageRating = () => {
  const rating = calculateAverageRating(); // 평균 점수
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
