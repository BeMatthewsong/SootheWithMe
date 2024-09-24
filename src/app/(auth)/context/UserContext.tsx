import { getCookie } from '@/actions/auth/cookie/cookie';
import { UserData } from '@/types/client.type';
import React, {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

interface UserContextType {
  user: UserData | null;
  isloading: boolean;
  errorMsg: string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isloading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = await getCookie('token');

      if (!token) {
        return;
      }

      setIsLoading(true);
      setErrorMsg(null);
      try {
        const userResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auths/user`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (userResponse.ok) {
          const userData = await userResponse.json();
        } else {
          const errorData = await userResponse.json();
          throw new Error(errorData.message);
        }
      } catch (err: any) {
        setErrorMsg(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    // 초기 유저 데이터 가져오기 (로그인 후)
    fetchUserData();
  }, []); // 컴포넌트 마운트 시 한 번만 호출

  return (
    <UserContext.Provider value={{ user, isloading, errorMsg }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('유저 데이터를 불러오는데 실패했습니다.');
  }
  return context;
};
