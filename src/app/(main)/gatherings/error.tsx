'use client';

import { useRouter } from 'next/navigation';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const router = useRouter();

  return (
    <div className='flex min-h-screen flex-col items-center justify-center text-14 font-medium text-var-gray-500'>
      <div>{error.message}</div>
      <div className='cursor-pointer' onClick={() => router.back()}>
        돌아가기
      </div>
    </div>
  );
}
