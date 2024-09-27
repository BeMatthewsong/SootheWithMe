// TODO: alert 부분 toast 로 변경

import { useState } from 'react';

const useCopyUrlToClipboard = () => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copyUrlToClipboard = async () => {
    const shareUrl = window.location.href;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setIsCopied(true);
      alert('링크가 클립보드에 복사되었습니다!');
    } catch (error) {
      console.error('클립보드 복사 실패', error);
      alert('클립보드 복사에 실패했습니다.');
    }
  };

  return { copyUrlToClipboard, isCopied };
};

export default useCopyUrlToClipboard;
