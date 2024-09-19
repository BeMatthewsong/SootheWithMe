import Pagination from './Pagination';

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// icon mocking
jest.mock('@/public/icons', () => ({
  IconChevronLeft: ({ onClick }: { onClick?: () => void }) => (
    <div data-testid='IconChevronLeft' onClick={onClick} />
  ),
  IconChevronRight: ({ onClick }: { onClick?: () => void }) => (
    <div data-testid='IconChevronRight' onClick={onClick} />
  ),
}));

describe('Pagination Component', () => {
  // 렌더링 시 이전 페이지 버튼과 다음 페이지 버튼이 표시되는지 확인
  it('should display the previous and next page buttons when rendered', () => {
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />,
    );

    expect(screen.getByTestId('IconChevronLeft')).toBeInTheDocument();
    expect(screen.getByTestId('IconChevronRight')).toBeInTheDocument();
  });

  // 현재 페이지가 1일 때 이전 페이지 버튼이 비활성화되는지 확인
  it('should disable the previous page button when the current page is 1', () => {
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />,
    );

    const prevButton = screen.getByTestId('IconChevronLeft').parentElement;

    expect(prevButton).toBeDisabled();
  });

  // 현재 페이지가 마지막 페이지일 때 다음 페이지 버튼이 비활성화되는지 확인
  it('should disable the next page button when the current page is the last page', () => {
    render(
      <Pagination currentPage={5} totalPages={5} onPageChange={() => {}} />,
    );

    const nextButton = screen.getByTestId('IconChevronRight').parentElement;

    expect(nextButton).toBeDisabled();
  });

  // 페이지 버튼 클릭 시 onPageChange 콜백이 호출되는지 확인
  it('should call onPageChange when a page button is clicked', () => {
    const onPageChange = jest.fn();
    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />,
    );

    fireEvent.click(screen.getByText('3'));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  // 이전 페이지 버튼 클릭 시 onPageChange 콜백이 올바르게 호출되는지 확인
  it('should call onPageChange correctly when the previous page button is clicked', () => {
    const onPageChange = jest.fn();
    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />,
    );

    const prevButton = screen.getByTestId('IconChevronLeft');

    fireEvent.click(prevButton);
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  // 다음 페이지 버튼 클릭 시 onPageChange 콜백이 올바르게 호출되는지 확인
  it('should call onPageChange correctly when the next page button is clicked', () => {
    const onPageChange = jest.fn();
    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />,
    );

    const nextButton = screen.getByTestId('IconChevronRight');

    fireEvent.click(nextButton);
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  // 현재 페이지가 4일 때 페이지네이션 범위가 올바르게 설정되는지 확인
  it('should set the pagination range correctly when the current page is 4', () => {
    render(
      <Pagination currentPage={4} totalPages={8} onPageChange={() => {}} />,
    );

    expect(screen.getByTestId('page-button-1')).toBeInTheDocument();
    expect(screen.getAllByText('···')).toHaveLength(2);
    expect(screen.getByTestId('page-button-3')).toBeInTheDocument();
    expect(screen.getByTestId('page-button-4')).toBeInTheDocument();
    expect(screen.getByTestId('page-button-5')).toBeInTheDocument();
    expect(screen.getByTestId('page-button-8')).toBeInTheDocument();
  });

  // 현재 페이지가 시작 부분에 가까운 경우 페이지네이션 범위가 올바르게 설정되는지 확인
  it('should set the pagination range correctly when the current page is near the start', () => {
    render(
      <Pagination currentPage={2} totalPages={8} onPageChange={() => {}} />,
    );

    expect(screen.getByTestId('page-button-1')).toBeInTheDocument();
    expect(screen.getByTestId('page-button-2')).toBeInTheDocument();
    expect(screen.getByTestId('page-button-3')).toBeInTheDocument();
    expect(screen.getAllByText('···')).toHaveLength(1);
    expect(screen.getByTestId('page-button-8')).toBeInTheDocument();
  });

  // 현재 페이지가 끝 부분에 가까운 경우 페이지네이션 범위가 올바르게 설정되는지 확인
  it('should set the pagination range correctly when the current page is near the end', () => {
    render(
      <Pagination currentPage={7} totalPages={8} onPageChange={() => {}} />,
    );

    expect(screen.getByTestId('page-button-1')).toBeInTheDocument();
    expect(screen.getAllByText('···')).toHaveLength(1);
    expect(screen.getByTestId('page-button-6')).toBeInTheDocument();
    expect(screen.getByTestId('page-button-7')).toBeInTheDocument();
    expect(screen.getByTestId('page-button-8')).toBeInTheDocument();
  });

  // totalPages가 10일 때 현재 페이지가 5일 경우 페이지네이션 범위가 올바르게 설정되는지 확인
  it('should set the pagination range correctly when totalPages is 10 and the current page is 5', () => {
    render(
      <Pagination currentPage={5} totalPages={10} onPageChange={() => {}} />,
    );

    expect(screen.getByTestId('page-button-1')).toBeInTheDocument();
    expect(screen.getAllByText('···')).toHaveLength(2);
    expect(screen.getByTestId('page-button-4')).toBeInTheDocument();
    expect(screen.getByTestId('page-button-5')).toBeInTheDocument();
    expect(screen.getByTestId('page-button-6')).toBeInTheDocument();
    expect(screen.getByTestId('page-button-10')).toBeInTheDocument();
  });

  // totalPages가 10일 때 현재 페이지가 2일 경우 페이지네이션 범위가 올바르게 설정되는지 확인
  it('should set the pagination range correctly when totalPages is 10 and the current page is 2', () => {
    render(
      <Pagination currentPage={2} totalPages={10} onPageChange={() => {}} />,
    );

    expect(screen.getByTestId('page-button-1')).toBeInTheDocument();
    expect(screen.getByTestId('page-button-2')).toBeInTheDocument();
    expect(screen.getByTestId('page-button-3')).toBeInTheDocument();
    expect(screen.getAllByText('···')).toHaveLength(1);
    expect(screen.getByTestId('page-button-10')).toBeInTheDocument();
  });
});
