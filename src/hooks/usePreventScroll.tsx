'use client';

import { useEffect } from 'react';

const usePreventScroll = (condition: boolean) => {
  useEffect(() => {
    if (condition) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [condition]);

  return;
};

export default usePreventScroll;
