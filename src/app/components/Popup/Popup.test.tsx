import Popup from './Popup';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('@/public/icons', () => ({
  IconX: ({ onClick }: { onClick?: () => void }) => (
    <div data-testid='IconX' onClick={onClick} />
  ),
}));

describe('Popup', () => {
  // 렌더링 확인
  it('should render Popup component', () => {
    const { container } = render(<Popup type='exit' hasCancelButton={true} />);
    expect(container).toBeInTheDocument();
  });

  // 회원가입 타입 팝업
  it('should render Popup component with signUpCompleted type', () => {
    const { container } = render(
      <Popup type='signUpCompleted' hasCancelButton={true} />,
    );
    expect(container).toBeInTheDocument();
  });

  // 취소 버튼 없는 팝업
  it('should render Popup component without cancel button', () => {
    const { container } = render(<Popup type='exit' hasCancelButton={false} />);
    expect(container).toBeInTheDocument();
  });

  // 닫기 버튼 클릭하면 팝업 닫히는지 확인
  it('should close the popup when the confirm button is clicked', () => {
    const onClickConfirm = jest.fn();
    const onClickClose = jest.fn();

    render(
      <Popup
        type='exit'
        hasCancelButton={true}
        onClickConfirm={onClickConfirm}
        onClickClose={onClickClose}
      />,
    );

    fireEvent.click(screen.getByTestId('close-modal-button'));
    expect(onClickClose).toHaveBeenCalled();
  });

  // 취소 버튼 클릭하면 취소 함수 실행되는지 확인
  it('should execute the cancel function when the cancel button is clicked', () => {
    const onClickConfirm = jest.fn();
    const onClickClose = jest.fn();

    render(
      <Popup
        type='exit'
        hasCancelButton={true}
        onClickConfirm={onClickConfirm}
        onClickClose={onClickClose}
      />,
    );

    fireEvent.click(screen.getByText('취소'));
    expect(onClickClose).toHaveBeenCalled();
  });

  // 확인 버튼 클릭하면 확인 함수 실행되는지 확인
  it('should execute the confirm function when the confirm button is clicked', () => {
    const onClickConfirm = jest.fn();
    const onClickClose = jest.fn();

    render(
      <Popup
        type='exit'
        hasCancelButton={true}
        onClickConfirm={onClickConfirm}
        onClickClose={onClickClose}
      />,
    );

    fireEvent.click(screen.getByText('확인'));
    expect(onClickConfirm).toHaveBeenCalled();
  });
});
