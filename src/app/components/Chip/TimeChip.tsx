interface TimeChipProps {
  state?: 'default' | 'active' | 'disabled';
  children: string;
  onClick?: () => void;
}

const stateClasses = {
  default:
    'bg-var-gray-50 border border-var-gray-200 text-var-gray-900 cursor-pointer dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-100',
  active:
    'bg-var-gray-900 border border-transparent text-white cursor-pointer dark:bg-neutral-50 dark:text-var-orange-600 font-semibold',
  disabled:
    'bg-var-gray-200 border border-transparent text-var-gray-400 cursor-default',
};

const TimeChip = ({ state = 'default', children, onClick }: TimeChipProps) => {
  return (
    <span
      className={`inline-block h-32 rounded-lg px-12 py-[6px] text-14 font-medium transition-colors duration-200 ease-in-out ${stateClasses[state]}`}
      onClick={onClick}
    >
      {children}
    </span>
  );
};

export default TimeChip;
