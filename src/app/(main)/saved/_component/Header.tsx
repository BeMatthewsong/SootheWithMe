import { HeadSaved } from '@/public/images';

const Header = () => {
  return (
    <div className='flex items-center gap-16'>
      <HeadSaved className='size-72' />
      <div>
        <h2 className='mb-8 text-18 font-semibold'>찜한 모임</h2>
        <p className='text-14 font-medium text-var-gray-700 dark:text-neutral-200'>
          마감되기 전에 지금 바로 참여해보세요 👀
        </p>
      </div>
    </div>
  );
};

export default Header;
