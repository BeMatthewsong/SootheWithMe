import { render, screen, fireEvent } from '@testing-library/react';
import ParticipationButton from './ParticipationButton';
import { useRouter } from 'next/navigation';
import useCopyUrlToClipboard from '@/hooks/useCopyUrlToClipboard';
import useCancelGathering from '@/hooks/useCancelGathering';
import useParticipation from '@/hooks/useParticipation';
import { UserData } from '@/types/client.type';
import Button from '../Button/Button';
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

// Popup 컴포넌트 모킹
jest.mock('../Popup/Popup', () => ({
  default: ({ onClickConfirm }: { onClickConfirm: () => void }) => (
    <div>
      <p>로그인이 필요해요.</p>
      <Button name='확인' variant='default' onClick={onClickConfirm} />
    </div>
  ),
}));

// 모임취소 모달 모킹
jest.mock('../Modal/CancelGatheringModal', () => {
  function MockCancelGatheringModal() {
    return <div>모임을 정말 취소하시겠습니까?</div>;
  }

  MockCancelGatheringModal.displayName = 'MockCancelGatheringModal';
  return MockCancelGatheringModal;
});

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(() => ({ id: '1' })),
}));

// hook 컴포넌트 모킹
jest.mock('@/hooks/useCopyUrlToClipboard', () => jest.fn());
jest.mock('@/hooks/useCancelGathering', () => jest.fn());
jest.mock('@/hooks/useParticipation', () => jest.fn());
let isShowPopup = false;

describe('ParticipationButton', () => {
  const mockRouter = { push: jest.fn() };
  const mockCopyUrlToClipboard = jest.fn();
  const mockCancelGathering = jest.fn();
  const mockSetHasParticipated = jest.fn();
  const mockSetIsShowPopup = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    // useCopyUrlToClipboard의 함수 모킹
    (useCopyUrlToClipboard as jest.Mock).mockReturnValue({
      copyUrlToClipboard: mockCopyUrlToClipboard,
    });

    // useCancelGathering의 함수 모킹
    (useCancelGathering as jest.Mock).mockReturnValue({
      cancelGathering: mockCancelGathering,
    });

    // useParticipation 훅의 반환값 모킹
    (useParticipation as jest.Mock).mockImplementation((user) => ({
      hasParticipated: false,
      setHasParticipated: mockSetHasParticipated,
      isShowPopup,
      setIsShowPopup: mockSetIsShowPopup, // 모킹된 함수 사용
      handleJoinClick: jest.fn(async (value) => {
        if (!user) {
          isShowPopup = value;
          mockSetIsShowPopup(true);
        }
      }),
    }));
  });

  afterEach(() => {
    jest.clearAllMocks(); // 모킹된 함수 초기화
  });

  // 주최자일 때 "취소하기"와 "공유하기" 버튼이 렌더링되는지 확인
  it('checks if "Cancel" and "Share" buttons are rendered when the user is a host', () => {
    render(
      <ParticipationButton
        isHost={true}
        user={mockUser}
        participantCount={5}
        capacity={10}
        registrationEnd='2099-12-31'
        participantsData={[]}
      />,
    );

    expect(
      screen.getByRole('button', { name: '취소하기' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: '공유하기' }),
    ).toBeInTheDocument();
  });

  // 주최자일 때 "공유하기" 버튼을 클릭하면 copyUrlToClipboard 함수가 호출되는지 확인
  it('checks if the copyUrlToClipboard function is called when "Share" button is clicked by the host', () => {
    render(
      <ParticipationButton
        isHost={true}
        user={mockUser}
        participantCount={5}
        capacity={10}
        registrationEnd='2099-12-31T23:59:59'
        canceledAt={null}
        participantsData={[]}
      />,
    );

    const shareButton = screen.getByRole('button', { name: '공유하기' });
    fireEvent.click(shareButton);

    expect(mockCopyUrlToClipboard).toHaveBeenCalled();
  });

  // 주최자일 때 "취소하기" 버튼을 클릭하면 모임 취소 모달이 띄워지는지 확인
  it('displays the meeting cancellation modal when the "Cancel" button is clicked by the host', async () => {
    render(
      <ParticipationButton
        isHost={true}
        user={mockUser}
        participantCount={5}
        capacity={10}
        registrationEnd='2099-12-31T23:59:59'
        canceledAt={null}
        participantsData={[]}
      />,
    );

    const cancelButton = screen.getByRole('button', { name: '취소하기' });
    fireEvent.click(cancelButton);

    expect(
      await screen.findByText('모임을 정말 취소하시겠습니까?'),
    ).toBeInTheDocument();
  });

  // 주최자일 때 마감일이 지났거나 모임이 취소된 경우 버튼이 비활성화되는지 확인
  it('checks if buttons are disabled when the host has passed the deadline or the gathering is canceled', () => {
    render(
      <ParticipationButton
        isHost={true}
        user={mockUser}
        participantCount={5}
        capacity={10}
        registrationEnd='2024-10-02'
        canceledAt='2024-10-01'
        participantsData={[]}
      />,
    );

    const cancelButton = screen.getByRole('button', { name: '취소하기' });
    const shareButton = screen.getByRole('button', { name: '공유하기' });

    expect(cancelButton).not.toBeDisabled();

    expect(shareButton).toBeDisabled();
  });

  // 참여자일 때 참여 상태에 따라 버튼 텍스트가 변경되는지 확인
  it('checks if button text changes based on participation status when the user is a participant', () => {
    (useParticipation as jest.Mock).mockReturnValue({
      hasParticipated: true,
      setHasParticipated: mockSetHasParticipated,
      isShowPopup: false,
      setIsShowPopup: mockSetIsShowPopup,
      handleJoinClick: jest.fn(),
      handleWithdrawClick: jest.fn(),
    });

    render(
      <ParticipationButton
        isHost={false}
        user={mockUser}
        participantCount={5}
        capacity={10}
        registrationEnd='2099-12-31'
        participantsData={[
          {
            teamId: 4,
            userId: 3,
            gatheringId: 1,
            joinedAt: '2024-10-01T00:00:00Z',
            User: {
              id: 1,
              email: mockUser.email,
              name: mockUser.name,
              companyName: mockUser.companyName,
              image: mockUser.image,
            },
          },
        ]}
      />,
    );

    expect(
      screen.getByRole('button', { name: '참여 취소하기' }),
    ).toBeInTheDocument();
  });

  // 참여 인원이 가득 찼을 때 버튼이 비활성화되는지 확인
  it('checks if the button is disabled when the participant count is full', () => {
    render(
      <ParticipationButton
        isHost={false}
        user={mockUser}
        participantCount={10}
        capacity={10} // 참여 인원이 가득 찬 상태
        registrationEnd='2099-12-31'
        participantsData={[]}
      />,
    );

    const button = screen.getByRole('button', { name: '참여하기' });
    expect(button).toBeDisabled();
  });

  // 마감일이 지났을 때 버튼이 비활성화되는지 확인
  it('checks if the button is disabled when the deadline has passed', () => {
    render(
      <ParticipationButton
        isHost={false}
        user={mockUser}
        participantCount={5}
        capacity={10}
        registrationEnd='2024-10-01' // 마감일이 지난 상태
        participantsData={[]}
      />,
    );

    const button = screen.getByRole('button', { name: '참여하기' });
    expect(button).toBeDisabled();
  });

  // 모임이 취소되었을 때 버튼이 비활성화되는지 확인
  it('checks if the button is disabled when the gathering is canceled', () => {
    render(
      <ParticipationButton
        isHost={false}
        user={mockUser}
        participantCount={5}
        capacity={10}
        registrationEnd='2099-12-31'
        canceledAt='2024-10-01' // 모임이 취소된 상태
        participantsData={[]}
      />,
    );

    const button = screen.getByRole('button', { name: '참여하기' });
    expect(button).toBeDisabled();
  });

  // 참여 인원이 가득 찼고 마감일이 지난 경우 버튼이 비활성화되는지 확인
  it('checks if the button is disabled when participant count is full and registration end date has passed.', () => {
    render(
      <ParticipationButton
        isHost={false}
        user={mockUser}
        participantCount={10} // 참여 인원이 가득 찬 상태
        capacity={10}
        registrationEnd='2024-10-01' // 마감일이 지난 상태
        participantsData={[]}
      />,
    );

    const button = screen.getByRole('button', { name: '참여하기' });
    expect(button).toBeDisabled();
  });

  // 모임이 취소되고 마감일이 지난 경우 버튼이 비활성화되는지 확인
  it('checks if the button is disabled when the meeting is canceled and registration end date has passed.', () => {
    render(
      <ParticipationButton
        isHost={false}
        user={mockUser}
        participantCount={5}
        capacity={10}
        registrationEnd='2024-10-02' // 마감일이 지난 상태
        canceledAt='2024-10-01' // 모임이 취소된 상태
        participantsData={[]}
      />,
    );

    const button = screen.getByRole('button', { name: '참여하기' });
    expect(button).toBeDisabled();
  });

  // 모든 조건이 충족될 때 버튼이 비활성화되는지 확인
  it('checks if the button is disabled when all conditions are met.', () => {
    render(
      <ParticipationButton
        isHost={false}
        user={mockUser}
        participantCount={10} // 참여 인원이 가득 찬 상태
        capacity={10}
        registrationEnd='2024-10-02' // 마감일이 지난 상태
        canceledAt='2024-10-01' // 모임이 취소된 상태
        participantsData={[]}
      />,
    );

    const button = screen.getByRole('button', { name: '참여하기' });
    expect(button).toBeDisabled();
  });
});
