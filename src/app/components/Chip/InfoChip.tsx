interface InfoChipProps {
  type?: 'date' | 'time';
  children: string;
}

const typeClasses = {
  date: 'text-white dark:text-neutral-900',
  time: 'text-var-orange-600',
};

const InfoChip = ({ type = 'date', children }: InfoChipProps) => {
  return (
    <span
      className={`inline-block rounded-[4px] bg-var-gray-900 px-8 py-[2px] text-14 font-medium ${typeClasses[type]} dark:bg-neutral-200 dark:font-semibold`}
    >
      {children}
    </span>
  );
};

export default InfoChip;
