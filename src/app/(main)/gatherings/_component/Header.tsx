import { HeadClass } from '@/public/images';

const Header = () => {
  return (
    <div className='flex space-x-16'>
      <div>
        <HeadClass className='h-72 w-72' />
      </div>
      <div className='space-y-8'>
        <div className='text-14 font-medium'>함께 할 사람이 없나요?</div>
        <div className='text-[18px] font-semibold md:text-24'>
          지금 모임에 참여해보세요
        </div>
      </div>
    </div>
  );
};

export default Header;
