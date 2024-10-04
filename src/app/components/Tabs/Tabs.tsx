import Tab from '@/app/components/Tab/Tab';
import { GatheringTabsType } from '@/types/client.type';

interface TabsProps {
  activeTab: GatheringTabsType;
  onTabClick: (type: GatheringTabsType) => void;
}

const Tabs = ({ activeTab, onTabClick }: TabsProps) => {
  return (
    <div className='flex items-center'>
      <Tab
        type='DALLAEMFIT'
        isActive={activeTab === 'DALLAEMFIT'}
        onClick={() => onTabClick('DALLAEMFIT')}
      />
      <Tab
        type='WORKATION'
        isActive={activeTab === 'WORKATION'}
        onClick={() => onTabClick('WORKATION')}
      />
    </div>
  );
};

export default Tabs;
