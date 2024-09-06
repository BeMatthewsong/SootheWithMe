interface TimeChipProps {
  state?: 'default' | 'active' | 'disabled';
  children: string;
}

const stateClasses = {
  default:
    'bg-var-gray-50 border border-var-gray-200 text-var-gray-900 cursor-pointer',
  active: 'bg-var-gray-900 text-white cursor-pointer',
  disabled: 'bg-var-gray-200 text-var-gray-400 cursor-default',
};

const TimeChip = ({ state = 'default', children }: TimeChipProps) => {
  return (
    <span
      className={`inline-block h-32 rounded-[8px] px-[12px] py-[6px] text-14 font-medium ${stateClasses[state]}`}
    >
      {children}
    </span>
  );
};

export default TimeChip;
