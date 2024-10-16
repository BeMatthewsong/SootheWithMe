import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Filter from './Filter';

// 아이콘 모킹
jest.mock('@/public/icons', () => ({
  IconCaret: () => <div data-testid='IconCaret' />,
  IconSort: () => <div data-testid='IconSort' />,
}));

// Filter 컴포넌트 - type : list 테스트
describe('Filter List Component', () => {
  const defaultProps = {
    children: 'Filter',
    options: ['Option 1', 'Option 2', 'Option 3'],
    state: 'default' as const,
    type: 'list' as const,
  };

  beforeEach(() => {
    render(<Filter {...defaultProps} />);
  });

  it('should render Filter component', () => {
    const filterElement = screen.getByTestId('filter-component');
    const iconElement = screen.getByTestId('IconCaret');
    expect(filterElement).toBeInTheDocument();
    expect(filterElement).toHaveTextContent('Filter');
    expect(iconElement).toBeInTheDocument();
  });

  it('should render options when clicked Filter componenet', () => {
    const filterElement = screen.getByTestId('filter-component');
    fireEvent.click(filterElement);

    defaultProps.options.forEach((option) => {
      const optionElement = screen.getByText(option);
      expect(optionElement).toBeInTheDocument();
    });
  });

  it.each(defaultProps.options)(
    'should change TextContent to `%s` when %s is clicked',
    (option) => {
      const filterElement = screen.getByTestId('filter-component');
      fireEvent.click(filterElement);

      const optionElement = screen.getByText(option);
      fireEvent.click(optionElement);

      expect(filterElement).toHaveTextContent(option);
      expect(filterElement).toHaveClass('text-var-gray-50 bg-var-gray-900');
    },
  );

  // 기본 필터 선택 시 초기화 테스트
  it('resets to default option', () => {
    const filterElement = screen.getByTestId('filter-component');
    fireEvent.click(filterElement);

    const optionElement = screen.getByText('Option 1');
    fireEvent.click(optionElement);

    fireEvent.click(filterElement);
    const defaultOptionElement = screen.getByText('Filter');
    fireEvent.click(defaultOptionElement);

    expect(filterElement).toHaveTextContent('Filter');
    expect(filterElement).toHaveClass('bg-var-gray-50 text-var-gray-800');
  });
});

// Filter 컴포넌트 - type : sort 테스트
describe('Filter Sort Component', () => {
  const defaultProps = {
    children: 'Filter',
    options: ['Option 1', 'Option 2', 'Option 3'],
    state: 'default' as const,
    type: 'sort' as const,
  };

  it('should render Filter component', () => {
    render(<Filter {...defaultProps} />);

    const filterElement = screen.getByTestId('filter-component');
    const iconElement = screen.getByTestId('IconSort');
    expect(filterElement).toBeInTheDocument();
    expect(filterElement).toHaveTextContent('Filter');
    expect(iconElement).toBeInTheDocument();
  });

  it.each(defaultProps.options)(
    'should change TextContent to `%s` when %s is clicked',
    (option) => {
      render(<Filter {...defaultProps} />);

      const filterElement = screen.getByTestId('filter-component');
      fireEvent.click(filterElement);

      const optionElement = screen.getByText(option);
      fireEvent.click(optionElement);

      expect(filterElement).toHaveTextContent(option);
      expect(filterElement).toHaveClass('text-var-gray-50 bg-var-gray-900');
    },
  );
});
