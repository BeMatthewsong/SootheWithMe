interface BadgeProps {
  children: string;
}

const Badge = ({ children }: BadgeProps) => {
  return (
    <div className='rounded-full bg-var-gray-900 px-8 text-12 font-semibold text-white'>
      {children}
    </div>
  );
};

export default Badge;
