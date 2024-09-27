'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

interface SavedGatheringContextProps {
  savedGatherings: number[];
  updateGathering: (item: number) => void;
}

const SavedGatheringContext = createContext<
  SavedGatheringContextProps | undefined
>(undefined);

const SavedGatheringProvider = ({ children }: { children: ReactNode }) => {
  // 찜한 모임의 Id 목록
  const [savedGatherings, setSavedGatherings] = useState<number[]>([]);

  // 최초 컴포넌트 렌더링 시 로컬 스토리지에서 데이터를 가져와서 상태에 저장한다.
  useEffect(() => {
    const savedIdList = localStorage.getItem('savedGathering');
    if (savedIdList) {
      setSavedGatherings(JSON.parse(savedIdList));
    }
  }, []);

  // savedGatherings가 변경될 때마다 로컬 스토리지에 저장한다.
  useEffect(() => {
    if (savedGatherings.length > 0) {
      localStorage.setItem('savedGathering', JSON.stringify(savedGatherings));
    } else {
      localStorage.removeItem('savedGathering');
    }
  }, [savedGatherings]);

  // 찜한 모임 목록을 업데이트
  const updateGathering = (id: number) => {
    const existingItemIndex = savedGatherings.findIndex(
      (gathering) => gathering === id,
    );

    if (existingItemIndex !== -1) {
      setSavedGatherings((prev) =>
        prev.filter((gathering) => gathering !== id),
      );
    } else {
      setSavedGatherings((prev) => [...prev, id]);
    }
  };

  return (
    <SavedGatheringContext.Provider
      value={{ savedGatherings, updateGathering }}
    >
      {children}
    </SavedGatheringContext.Provider>
  );
};

const useSavedGatheringList = (): SavedGatheringContextProps => {
  const context = useContext(SavedGatheringContext);
  if (!context) {
    throw new Error(
      'useSavedGathering must be used within a SavedGatheringProvider',
    );
  }
  return context;
};

export { SavedGatheringProvider, useSavedGatheringList };
