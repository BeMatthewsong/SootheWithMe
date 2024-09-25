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
      className={`z-dropdown absolute mt-4 max-h-240 w-full min-w-max overflow-y-auto rounded-xl bg-var-gray-50 ring-2 ring-var-gray-400 ${classnames}`}
    >
      <ul>
        {options.map((option, index) => (
          <li
            key={index}
            className='cursor-pointer rounded-[36px] px-12 py-12 text-14 text-var-black hover:bg-var-orange-100 md:px-16'
            onClick={() => handleSelect(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDown;
