import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const useScrollGradientEffect = () => {
  const [topGradientVisible, setTopGradientVisible] = useState(false);
  const [bottomGradientVisible, setBottomGradientVisible] = useState(false);

  const { ref: firstItemRef, inView: firstInView } = useInView({
    threshold: 0,
  });
  const { ref: lastItemRef, inView: lastInView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    setTopGradientVisible(!firstInView);
    setBottomGradientVisible(!lastInView);
  }, [firstInView, lastInView]);

  return {
    topGradientVisible,
    bottomGradientVisible,
    firstItemRef,
    lastItemRef,
  };
};

export default useScrollGradientEffect;
