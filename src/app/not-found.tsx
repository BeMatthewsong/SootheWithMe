import Link from 'next/link';

const NotFound = () => {
  return (
    <div className='flex h-full flex-col items-center justify-center text-14 font-medium text-var-gray-500'>
      <h2 className='drop-shadow-text mb-16 text-center text-[100px] font-bold leading-normal text-var-orange-600'>
        404
      </h2>
      <h3 className='text-center text-16 font-medium md:text-[16px]'>
        존재하지 않는 주소를 입력하셨거나
        <br />
        요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
      </h3>
      <Link
        href='/'
        className='mt-40 flex items-center justify-center rounded-xl bg-var-orange-600 px-40 py-16 font-pretendard text-[14px] font-semibold text-var-white hover:bg-var-orange-700 md:text-[16px]'
      >
        메인 페이지로 이동
      </Link>
    </div>
  );
};

export default NotFound;
