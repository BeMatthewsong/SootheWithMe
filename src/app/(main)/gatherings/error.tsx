'use client';

import { useRouter } from 'next/navigation';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const router = useRouter();

  return (
    <div className='flex h-full flex-col items-center justify-center text-14 font-medium text-var-gray-500'>
      <h2 className='drop-shadow-text text-center text-[100px] font-bold leading-normal text-var-orange-600'>
        ERROR
      </h2>
      <h3 className='text-center text-16 font-medium md:text-[16px]'>
        {error.message}
      </h3>
      <button
        className='mt-40 flex items-center justify-center rounded-xl bg-var-orange-600 px-40 py-16 font-pretendard text-[14px] font-semibold text-var-white hover:bg-var-orange-700 md:text-[16px]'
        onClick={() => router.back()}
      >
        돌아가기
      </button>
    </div>
  );
}
