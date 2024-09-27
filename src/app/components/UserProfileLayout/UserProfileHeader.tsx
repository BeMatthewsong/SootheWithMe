import { BtnEdit, ImageProfile } from '@/public/images';

interface UserProfileHeaderProps {
  toggleModal: () => void;
}

const UserProfileHeader = ({ toggleModal }: UserProfileHeaderProps) => {
  return (
    <>
      <div className='flex items-center justify-between rounded-t-[24px] bg-var-orange-400 p-4 px-24 pb-16 pt-[14px]'>
        <div className='text-18 font-semibold text-var-gray-900'>내 프로필</div>
        <ImageProfile className='mx-auto mb-[-26px] h-40 w-156 md:mr-156' />
        <button onClick={toggleModal}>
          <BtnEdit className='size-32' />
        </button>
      </div>
      {/* 프로필 헤더 밑줄입니다. */}
      <div className='h-8 w-full border-t-2 border-var-orange-600 bg-var-orange-400'></div>
    </>
  );
};

export default UserProfileHeader;
