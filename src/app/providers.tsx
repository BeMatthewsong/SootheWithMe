'use client';

import { SavedGatheringProvider } from '@/context/SavedGatheringContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode } from 'react';
import { ThemeProvider } from './theme-provider';

// QueryClient 인스턴스를 생성하는 함수
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // 윈도우 포커스 시 자동으로 쿼리를 다시 가져오지 않음
        retry: 3, // 쿼리가 실패할 경우 재시도 횟수
        retryDelay: 1000, // 재시도 사이의 지연 시간 (밀리초)
      },
    },
  });
}

// 브라우저 환경에서만 사용하는 QueryClient 인스턴스를 저장할 변수
let browserQueryClient: QueryClient | undefined = undefined;

// 현재 환경에 맞는 QueryClient를 반환하는 함수
function getQueryClient() {
  const isServer = typeof window === 'undefined'; // 서버 환경인지 확인
  if (isServer) {
    // 서버 환경에서는 새 QueryClient를 생성하여 반환
    return makeQueryClient();
  } else {
    // 브라우저 환경에서는 기존의 QueryClient를 반환하거나, 없으면 새로 생성
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

// 애플리케이션의 Provider를 설정하는 컴포넌트
export default function Providers({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient(); // 현재 환경에 맞는 QueryClient를 가져옴

  // QueryClientProvider로 자식 컴포넌트들을 감싸서 QueryClient를 제공
  return (
    <ThemeProvider attribute='class' defaultTheme='system'>
      <SavedGatheringProvider>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </SavedGatheringProvider>
    </ThemeProvider>
  );
}
