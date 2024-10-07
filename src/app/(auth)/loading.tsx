'use client';

import Loader from '@/app/components/Loader/Loader';

const Loading = () => {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <Loader />;
    </div>
  );
};

export default Loading;
