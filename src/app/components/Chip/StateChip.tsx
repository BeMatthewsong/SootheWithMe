import { IconCheck } from '@/public/icons';

interface StateChipProps {
  state: 'scheduled' | 'done' | 'confirmed' | 'pending'; // 이용 예정 | 이용 완료 | 개설 확정 | 개설 대기
}

const stateClasses = {
  scheduled:
    'bg-var-orange-100 text-var-orange-600 dark:bg-neutral-300 dark:text-var-orange-600 dark:font-semibold',
  done: 'bg-var-gray-200 text-var-gray-500 dark:bg-neutral-900 dark:text-neutral-100 dark:border dark:border-neutral-600',
  confirmed:
    'bg-white text-var-orange-500 border border-var-orange-100 dark:bg-var-orange-600 dark:text-white dark:border dark:border-var-orange-600 dark:font-semibold',
  pending:
    'bg-white text-var-gray-500 border border-var-gray-200 dark:bg-neutral-600 dark:text-neutral-200 dark:border dark:border-neutral-600',
};

const stateContents = {
  scheduled: '이용 예정',
  done: '이용 완료',
  confirmed: '개설 확정',
  pending: '개설 대기',
};

const StateChip = ({ state }: StateChipProps) => {
  return (
    <span
      className={`inline-flex h-32 items-center rounded-full px-[12px] py-[6px] text-14 font-medium ${stateClasses[state]}`}
    >
      {state === 'confirmed' ? (
        <IconCheck className='mr-4 h-16 w-16 dark:brightness-[30]' />
      ) : null}
      {stateContents[state]}
    </span>
  );
};

export default StateChip;
