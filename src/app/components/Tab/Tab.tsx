import { IconDallaemfit, IconWorkation } from '@/public/icons';
import { GatheringTabsType } from '@/types/client.type';

interface TabProps {
  type: GatheringTabsType;
  isActive: boolean;
  onClick: () => void;
}

const Tab = ({ type, isActive, onClick }: TabProps) => {
  const styles = isActive
    ? 'text-var-gray-900 first-of-type:before:right-0 last-of-type:before:left-0'
    : 'text-var-gray-400 first-of-type:before:-right-full last-of-type:before:-left-full';

  return (
    <div
      className={`relative flex cursor-pointer items-center gap-4 overflow-hidden px-8 pb-4 text-18 font-semibold transition ${styles} before:absolute before:bottom-0 before:w-full before:border-b-2 before:border-var-gray-900 before:transition-all before:duration-300`}
      onClick={onClick}
    >
      {type === 'WORKATION' ? (
        <>
          워케이션 <IconWorkation width={32} height={32} />
        </>
      ) : (
        <>
          달램핏 <IconDallaemfit width={32} height={32} />
        </>
      )}
    </div>
  );
};

export default Tab;
