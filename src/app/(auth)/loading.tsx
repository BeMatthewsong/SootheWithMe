'use client';

import Loader from '@/app/components/Loader/Loader';

const Loading = () => {
  return (
    <div className='flex min-h-360 items-center justify-center'>
      <Loader />;
    </div>
  );
};

export default Loading;
