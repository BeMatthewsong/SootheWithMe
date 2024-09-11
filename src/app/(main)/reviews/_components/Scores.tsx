import { RATING_DATA as data } from '../mockData';
import ScoreBar from './ScoreBar';

const Scores = () => {
  // TODO : useCallback 사용 (dependencies로 data를 받음)
  const calculateBarWidth = (rating: number) => {
    const total = Object.values(data).reduce((sum, count) => sum + count, 0); // 전체 별점 개수 합산
    const percentage = (rating / total) * 100; // 퍼센티지 계산
    return `${percentage}%`;
  };

  return (
    <div className='flex h-116 grow flex-col gap-4 md:w-300'>
      {/* TODO : map 메소드 사용*/}
      <ScoreBar
        rating={5}
        barWidth={calculateBarWidth(data.fiveStars)}
        count={data.fiveStars}
      />
      <ScoreBar
        rating={4}
        barWidth={calculateBarWidth(data.fourStars)}
        count={data.fourStars}
      />
      <ScoreBar
        rating={3}
        barWidth={calculateBarWidth(data.threeStars)}
        count={data.threeStars}
      />
      <ScoreBar
        rating={2}
        barWidth={calculateBarWidth(data.twoStars)}
        count={data.twoStars}
      />
      <ScoreBar
        rating={1}
        barWidth={calculateBarWidth(data.oneStar)}
        count={data.oneStar}
      />
    </div>
  );
};

export default Scores;
