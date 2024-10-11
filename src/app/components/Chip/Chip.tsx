interface ChipProps {
  state?: 'default' | 'active';
  children: string;
  onClick?: () => void;
}

const stateClasses = {
  default:
    'bg-var-gray-200 text-var-bg-gray-900 dark:bg-neutral-500 dark:text-neutral-900',
  active: 'bg-var-gray-900 text-white dark:bg-neutral-50 dark:text-neutral-900',
};

const Chip = ({ state = 'default', children, onClick }: ChipProps) => {
  return (
    <span
      onClick={onClick}
      className={`inline-block cursor-pointer rounded-[12px] px-[12px] py-8 text-14 font-medium md:px-16 md:py-[10px] ${stateClasses[state]} transition-colors duration-150 dark:text-neutral-900`}
    >
      {children}
    </span>
  );
};

export default Chip;
