interface ScoreBarProps {
  rating: number;
  barWidth: number;
  count: number;
}
const ScoreBar = ({ rating, barWidth, count }: ScoreBarProps) => {
  return (
    <div className='flex items-center gap-12 text-14 font-medium text-var-gray-700'>
      <span>{rating}점</span>
      <div className='relative h-4 w-84 grow overflow-hidden rounded-[2px] bg-var-gray-200 md:w-240'>
        <div
          className='${barWidth} absolute left-0 top-0 h-full bg-var-gray-900'
          style={{ width: `${barWidth}%` }}
        ></div>
      </div>
      <span className='text-var-gray-400'>{count}</span>
    </div>
  );
};

export default ScoreBar;
