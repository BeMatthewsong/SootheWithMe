import DropDown from './DropDown';

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('DropDown 컴포넌트', () => {
  // 주어진 옵션으로 렌더링되는지 확인합니다.
  it('should render with given options', () => {
    const options = ['Option 1', 'Option 2', 'Option 3'];

    render(
      <DropDown options={options} onSelect={() => {}} onClose={() => {}} />,
    );

    options.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  // 옵션을 클릭했을 때 onSelect와 onClose 콜백이 호출되는지 확인합니다.
  it('should call onSelect and onClose when an option is clicked', () => {
    const options = ['Option 1'];
    const handleSelect = jest.fn();
    const handleClose = jest.fn();

    render(
      <DropDown
        options={options}
        onSelect={handleSelect}
        onClose={handleClose}
      />,
    );

    fireEvent.click(screen.getByText('Option 1'));

    expect(handleSelect).toHaveBeenCalledWith('Option 1');
    expect(handleClose).toHaveBeenCalled();
  });

  // 드롭다운이 닫히는지 확인합니다.
  it('should close the dropdown when an option is selected', () => {
    const options = ['Option 1'];
    const handleSelect = jest.fn();
    const handleClose = jest.fn();

    render(
      <DropDown
        options={options}
        onSelect={handleSelect}
        onClose={handleClose}
      />,
    );

    fireEvent.click(screen.getByText('Option 1'));

    expect(handleClose).toHaveBeenCalled();
  });

  // 주어진 클래스 이름이 적용되는지 확인합니다. container 를 이용하여 확인합니다.
  it('should apply custom classnames', () => {
    const options = ['Option 1'];

    const { container } = render(
      <DropDown
        options={options}
        onSelect={() => {}}
        onClose={() => {}}
        classnames='custom-class'
      />,
    );

    const dropdown = container.querySelector('div');

    expect(dropdown).toHaveClass('custom-class');
  });

  // options 가 없을 때 렌더링 되는지 확인합니다.
  it('should not render any items when options array is empty', () => {
    render(<DropDown options={[]} onSelect={() => {}} onClose={() => {}} />);

    const items = screen.queryAllByRole('listitem');

    expect(items).toHaveLength(0);
  });

  // option 이 많을 때에도 렌더링이 되는지 확인합니다.
  it('should render correctly with a large number of options', () => {
    const options = Array.from({ length: 100 }, (_, i) => `Option ${i + 1}`);

    render(
      <DropDown options={options} onSelect={() => {}} onClose={() => {}} />,
    );

    options.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });
});
