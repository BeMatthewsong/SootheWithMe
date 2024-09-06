'use client';

interface ButtonProps {
  name: string;
  disabled?: boolean;
  variant: 'default' | 'white' | 'gray' | 'grayOutline';
  type?: 'button' | 'submit' | 'reset';
}

const Button = ({
  name = '생성하기',
  disabled = false,
  variant = 'default',
  type = 'button',
}: ButtonProps) => {
  const variantClasses = {
    default: 'bg-var-orange-600 text-var-white hover:bg-var-orange-700',
    white:
      'bg-var-white text-var-orange-600 ring-2 ring-var-orange-600 hover:bg-var-orange-100',
    gray: 'bg-var-gray-400 text-var-white ring-2 ring-var-gray-400 hover:bg-var-gray-300',
    grayOutline:
      'bg-var-white text-var-gray-400 ring-2 ring-var-gray-400 hover:bg-var-gray-300',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`flex w-full items-center justify-center rounded-xl py-[10px] font-pretendard text-[14px] font-semibold md:text-[16px] ${
        variantClasses[variant]
      } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
    >
      {name}
    </button>
  );
};

export default Button;
