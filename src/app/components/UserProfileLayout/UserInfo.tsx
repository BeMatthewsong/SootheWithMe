import { UserData } from '@/types/client.type';

interface UserInfoProps {
  user: UserData | null; // user를 prop으로 받도록 수정
}
const UserInfo = ({ user }: UserInfoProps) => {
  return (
    <>
      {/* 이름 */}
      <div className='text-16 font-semibold text-var-gray-800 dark:text-neutral-100'>
        {user?.name}
      </div>
      <div className='text-14 font-medium text-var-gray-800 dark:text-neutral-100'>
        {/* 회사명 */}
        <div>
          company.
          <span className='pl-[6px] font-normal'>{user?.companyName}</span>
        </div>
        {/* 이메일 */}
        <div>
          E-mail. <span className='pl-24 font-normal'>{user?.email}</span>
        </div>
      </div>
    </>
  );
};
export default UserInfo;
