import { HeadReview } from '@/public/images';

const Header = () => {
  return (
    <div className='flex items-center gap-16'>
      <HeadReview className='h-72 w-72' />
      <div>
        <h2 className='mb-8 text-18 font-semibold'>모든 리뷰</h2>
        <p className='text-14 font-medium text-var-gray-700 dark:text-neutral-200'>
          같이달램을 이용한 분들은 이렇게 느꼈어요 🙌
        </p>
      </div>
    </div>
  );
};

export default Header;
