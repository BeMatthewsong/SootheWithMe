import { UserData } from '@/types/client.type';
import React, {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

interface UserContextType {
  user: UserData | null;
  setUser: Dispatch<SetStateAction<UserData | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    // 클라이언트에서만 로컬 스토리지에 접근
    if (typeof window !== 'undefined') {
      const savedUserData = localStorage.getItem('userData');
      if (savedUserData) {
        setUser(JSON.parse(savedUserData));
      }
    }
  }, []);


  useEffect(() => {
    // 유저 데이터가 변경될 때마다 로컬 스토리지에 저장
    if (user) {
      localStorage.setItem('userData', JSON.stringify(user));
    } else {
      localStorage.removeItem('userData'); // 로그아웃 시 로컬 스토리지에서 삭제
    }
  }, [user]);
  return (
    <UserContext.Provider value={{ user, setUser }}>
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
