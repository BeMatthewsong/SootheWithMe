import { ReactNode } from 'react';

interface TopTabProps {
  isActive?: boolean;
  children: ReactNode;
}

const TopTab = ({ isActive, children }: TopTabProps) => {
  return (
    <div
      className={`flex cursor-pointer items-center gap-4 py-[18px] text-14 md:text-16 ${isActive ? 'font-bold text-var-gray-900' : 'font-semibold text-var-orange-50'}`}
    >
      {children}
    </div>
  );
};

export default TopTab;
