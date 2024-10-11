'use client';

import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import BottomFloatingBar from './BottomFloatingBar';
import { UserData } from '@/types/client.type';
import { GatheringParticipantsType } from '@/types/data.type';
import '@testing-library/jest-dom';

// 유저데이터 모킹
const mockUser: UserData = {
  id: 1,
  email: 'test@example.com',
  name: 'Test User',
  companyName: 'Test Company',
  image: 'test-image.jpg',
  createdAt: '2024-10-01T00:00:00Z',
  updatedAt: '2024-10-03T00:00:00Z',
};
const mockParticipantsData: GatheringParticipantsType[] = []; // 참가자 데이터 모킹

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(() => ({ id: '1' })),
}));

describe('BottomFloatingBar 컴포넌트 테스트', () => {
  const mockRouter = { push: jest.fn() };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  // 참가자일 때 기본 렌더링 확인
  it('renders correctly when the user is a participant', () => {
    render(
      <BottomFloatingBar
        user={mockUser}
        createdBy={12}
        participantCount={5}
        capacity={10}
        registrationEnd='2024-10-01'
        canceledAt={null}
        participantsData={mockParticipantsData}
      />,
    );

    // 컴포넌트의 텍스트가 올바르게 렌더링되는지 확인
    expect(
      screen.getByText('더 건강한 나와 팀을 위한 프로그램 🏃‍️️'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        '국내 최고 웰니스 전문가와 프로그램을 통해 지친 몸과 마음을 회복해봐요',
      ),
    ).toBeInTheDocument();

    // 참여하기 버튼이 존재하는지 확인
    expect(
      screen.getByRole('button', { name: '참여하기' }),
    ).toBeInTheDocument();
  });

  // 주최자일 때 기본 렌더링 확인
  it('renders correctly when the user is the organizer', () => {
    render(
      <BottomFloatingBar
        user={mockUser}
        createdBy={1}
        participantCount={5}
        capacity={10}
        registrationEnd='2024-10-01'
        canceledAt={null}
        participantsData={mockParticipantsData}
      />,
    );

    // 컴포넌트의 텍스트가 올바르게 렌더링되는지 확인
    expect(
      screen.getByText('더 건강한 나와 팀을 위한 프로그램 🏃‍️️'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        '국내 최고 웰니스 전문가와 프로그램을 통해 지친 몸과 마음을 회복해봐요',
      ),
    ).toBeInTheDocument();

    // 공유하기 버튼이 존재하는지 확인
    expect(
      screen.getByRole('button', { name: '공유하기' }),
    ).toBeInTheDocument();
    // 취소하기 버튼이 존재하는지 확인
    expect(
      screen.getByRole('button', { name: '취소하기' }),
    ).toBeInTheDocument();
  });
});
