interface ChipProps {
  state?: 'default' | 'active';
  children: string;
}

const stateClasses = {
  default: 'bg-var-gray-200 text-var-bg-gray-900',
  active: 'bg-var-gray-900 text-white',
};

const Chip = ({ state = 'default', children }: ChipProps) => {
  return (
    <span
      className={`inline-block rounded-[12px] px-[12px] py-8 text-14 font-medium md:px-16 md:py-[10px] ${stateClasses[state]}`}
    >
      {children}
    </span>
  );
};

export default Chip;
