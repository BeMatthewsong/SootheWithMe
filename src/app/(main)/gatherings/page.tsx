import Header from './_component/Header';
import ClientSideGatherings from './_component/ClientSideGatherings';
import getGatherings from '@/app/api/actions/gatherings/getGatherings';

const GatheringsPage = async () => {
  const gatherings = await getGatherings({ type: 'DALLAEMFIT' });

  return (
    <div className='mx-auto max-w-[1200px]'>
      <div className='min-h-screen bg-var-gray-50 px-16 pt-24 md:px-24 md:pt-40 lg:px-100'>
        <Header />
        <ClientSideGatherings gatherings={gatherings} />
      </div>
    </div>
  );
};

export default GatheringsPage;
