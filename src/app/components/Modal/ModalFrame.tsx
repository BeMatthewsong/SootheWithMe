import { ReactNode } from 'react';
import ModalPortal from './ModalPortal';
import MotionWrapper from '../MotionWrapper/MotionWrapper';

interface ModalFrameProps {
  children: ReactNode;
  onClose: () => void;
}

const ModalFrame = ({ children, onClose }: ModalFrameProps) => {
  return (
    <ModalPortal>
      <div
        onClick={onClose}
        className='fixed left-0 top-0 z-popup flex h-full w-full items-center justify-center bg-var-black/50 md:h-screen'
      >
        <MotionWrapper>
          <div onClick={(e) => e.stopPropagation()}>{children}</div>
        </MotionWrapper>
      </div>
    </ModalPortal>
  );
};
export default ModalFrame;
