import ProgressBar from './ProgressBar';

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Arrange Mock Data
const MOCK_DATA_BASE = {
  participantNumber: 1,
  capacity: 20,
  hasParticipantNumber: true,
  hasOpeningConfirmed: true,
  hasText: true,
};

// Arrange Mock Icons
jest.mock('@/public/icons', () => ({
  IconCheckCircle: () => <div data-testid='IconCheckCircle' />,
  IconArrow: () => <div data-testid='IconArrow' />,
  IconPerson: () => <div data-testid='IconPerson' />,
}));

describe('ProgressBar Component', () => {
  // 프로그레스바 렌더링 확인
  it('should render the progress bar', () => {
    render(
      <ProgressBar
        participantNumber={MOCK_DATA_BASE.participantNumber}
        capacity={MOCK_DATA_BASE.capacity}
        hasParticipantNumber={MOCK_DATA_BASE.hasParticipantNumber}
        hasOpeningConfirmed={MOCK_DATA_BASE.hasOpeningConfirmed}
        hasText={MOCK_DATA_BASE.hasText}
      />,
    );

    const progressBar = screen.getByTestId('progress-bar');

    expect(progressBar).toBeInTheDocument();
  });

  // 참가 인원이 다 찼을 때 프로그레스바 색상 확인
  it('should render the progress bar with the correct color', () => {
    render(
      <ProgressBar
        participantNumber={MOCK_DATA_BASE.capacity}
        capacity={MOCK_DATA_BASE.capacity}
        hasParticipantNumber={MOCK_DATA_BASE.hasParticipantNumber}
        hasOpeningConfirmed={MOCK_DATA_BASE.hasOpeningConfirmed}
        hasText={MOCK_DATA_BASE.hasText}
      />,
    );

    const progressBar = screen.getByTestId('colored-progress-bar');

    expect(progressBar).toHaveClass('bg-var-orange-400');
  });

  // 참가 인원 렌더링 확인
  it('should render the participant number', () => {
    render(
      <ProgressBar
        participantNumber={MOCK_DATA_BASE.participantNumber}
        capacity={MOCK_DATA_BASE.capacity}
        hasParticipantNumber={!MOCK_DATA_BASE.hasParticipantNumber} // false
        hasOpeningConfirmed={MOCK_DATA_BASE.hasOpeningConfirmed}
        hasText={MOCK_DATA_BASE.hasText}
      />,
    );

    const participantNumber = screen.queryByTestId('number-of-participant');

    expect(participantNumber).not.toBeInTheDocument();
  });

  // participantNumber가 음수이면 프로그레스바 렌더링 안 되는지 확인
  it('should render the participant number when it is negative', () => {
    render(
      <ProgressBar
        participantNumber={-1}
        capacity={MOCK_DATA_BASE.capacity}
        hasParticipantNumber={MOCK_DATA_BASE.hasParticipantNumber}
        hasOpeningConfirmed={MOCK_DATA_BASE.hasOpeningConfirmed}
        hasText={MOCK_DATA_BASE.hasText}
      />,
    );

    const progressBar = screen.queryByTestId('progress-bar');

    expect(progressBar).not.toBeInTheDocument();
  });

  // capacity가 음수이면 프로그레스바 렌더링 안 되는지 확인
  it('should render the participant number when it is negative', () => {
    render(
      <ProgressBar
        participantNumber={MOCK_DATA_BASE.participantNumber}
        capacity={-1}
        hasParticipantNumber={MOCK_DATA_BASE.hasParticipantNumber}
        hasOpeningConfirmed={MOCK_DATA_BASE.hasOpeningConfirmed}
        hasText={MOCK_DATA_BASE.hasText}
      />,
    );

    const progressBar = screen.queryByTestId('progress-bar');

    expect(progressBar).not.toBeInTheDocument();
  });

  // isOpeningConfirmed가 true (개설확정 인원 충족)일 때 개설확정 배지 렌더링 확인
  it('should render the opening confirmed badge', () => {
    render(
      <ProgressBar
        participantNumber={5}
        capacity={MOCK_DATA_BASE.capacity}
        hasParticipantNumber={MOCK_DATA_BASE.hasParticipantNumber}
        hasOpeningConfirmed={MOCK_DATA_BASE.hasOpeningConfirmed}
        hasText={MOCK_DATA_BASE.hasText}
      />,
    );

    const openingConfirmed = screen.getByTestId('opening-confirmed-badge');

    expect(openingConfirmed).toBeInTheDocument();
  });

  // isOpeningConfirmed가 false (개설확정 인원 충족하지 않을 때)일 때 개설확정 배지 렌더링 확인
  it('should render the opening confirmed badge', () => {
    render(
      <ProgressBar
        participantNumber={4}
        capacity={MOCK_DATA_BASE.capacity}
        hasParticipantNumber={MOCK_DATA_BASE.hasParticipantNumber}
        hasOpeningConfirmed={MOCK_DATA_BASE.hasOpeningConfirmed}
        hasText={MOCK_DATA_BASE.hasText}
      />,
    );

    const openingConfirmed = screen.queryByTestId('opening-confirmed-badge');

    expect(openingConfirmed).not.toBeInTheDocument();
  });

  // hasText가 false일 때 우측 텍스트 렌더링 확인
  it('should render the text', () => {
    render(
      <ProgressBar
        participantNumber={MOCK_DATA_BASE.participantNumber}
        capacity={MOCK_DATA_BASE.capacity}
        hasParticipantNumber={MOCK_DATA_BASE.hasParticipantNumber}
        hasOpeningConfirmed={MOCK_DATA_BASE.hasOpeningConfirmed}
        hasText={!MOCK_DATA_BASE.hasText} // false
      />,
    );

    const text = screen.queryByTestId('text');

    expect(text).not.toBeInTheDocument();
  });
});
