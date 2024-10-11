'use client';

interface DropDownProps {
  options: string[];
  onSelect: (option: string) => void;
  onClose: () => void;
  classnames?: string;
}

const DropDown = ({
  options,
  onSelect,
  onClose,
  classnames = '',
}: DropDownProps) => {
  const handleSelect = (option: string) => {
    onSelect(option);
    onClose();
  };

  return (
    <div
      className={`absolute z-dropdown mt-4 max-h-240 w-full min-w-max overflow-y-auto rounded-xl bg-var-gray-50 ring-2 ring-var-gray-400 ${classnames} dark:bg-neutral-800 dark:ring-neutral-700`}
    >
      <ul>
        {options.map((option, index) => (
          <li
            key={index}
            className='group cursor-pointer p-4 text-14 text-var-black dark:text-neutral-300'
            onClick={() => handleSelect(option)}
          >
            <span className='block rounded-[12px] px-12 py-12 group-hover:bg-var-orange-100 md:px-16 group-hover:dark:bg-neutral-600 group-hover:dark:text-neutral-50'>
              {option}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDown;
