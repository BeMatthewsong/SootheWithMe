import { PulseLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <PulseLoader color='#EA580C' />
    </div>
  );
};

export default Loading;
