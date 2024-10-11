import InfoChip from '../Chip/InfoChip';
import { formatDate, formatTimeColon } from '@/utils/formatDate';

interface DateTimeChipsProps {
  date: string;
  time: string;
}

const DateTimeChips = ({ date, time }: DateTimeChipsProps) => {
  return (
    <div className='mt-12 space-x-8'>
      <InfoChip type='date' data-testid='date'>
        {formatDate(date)}
      </InfoChip>
      <InfoChip type='time' data-testid='time'>
        {formatTimeColon(time)}
      </InfoChip>
    </div>
  );
};

export default DateTimeChips;
