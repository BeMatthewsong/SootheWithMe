'use client';

interface ButtonProps {
  name: string;
  disabled?: boolean;
  variant: 'default' | 'white' | 'gray' | 'grayOutline';
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

const Button = ({
  name = '생성하기',
  disabled = false,
  variant = 'default',
  type = 'button',
  onClick,
}: ButtonProps) => {
  const variantClasses = {
    default: 'bg-var-orange-600 text-var-white hover:bg-var-orange-700',
    white:
      'bg-var-white text-var-orange-600 ring-1 ring-var-orange-600 hover:bg-var-orange-700 hover:text-var-white',
    gray: 'bg-var-gray-400 text-var-white ring-1 ring-var-gray-400 cursor-not-allowed',
    grayOutline:
      'bg-var-white text-var-gray-400 ring-1 ring-var-gray-400 cursor-not-allowed',
  };

  // variant 에 없는 값인 경우 default 값으로 설정
  const appliedClasses = variantClasses[variant] || variantClasses.default;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`flex w-full items-center justify-center rounded-xl py-[10px] font-pretendard text-[14px] font-semibold md:text-[16px] ${
        appliedClasses
      } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
    >
      {name}
    </button>
  );
};

export default Button;
