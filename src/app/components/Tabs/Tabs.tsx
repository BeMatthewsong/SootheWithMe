import Tab from '@/app/components/Tab/Tab';

interface TabsProps {
  activeTab: 'DALLAEMFIT' | 'WORKATION';
  onTabClick: (type: 'DALLAEMFIT' | 'WORKATION') => void;
}

const Tabs = ({ activeTab, onTabClick }: TabsProps) => {
  return (
    <div className='flex space-x-12'>
      <Tab
        type='dalaemfit'
        isActive={activeTab === 'DALLAEMFIT'}
        onClick={() => onTabClick('DALLAEMFIT')}
      />
      <Tab
        type='workation'
        isActive={activeTab === 'WORKATION'}
        onClick={() => onTabClick('WORKATION')}
      />
    </div>
  );
};

export default Tabs;
