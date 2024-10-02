import { useState } from 'react';

import toast from 'react-hot-toast';

const useCopyUrlToClipboard = () => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copyUrlToClipboard = async () => {
    const shareUrl = window.location.href;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setIsCopied(true);
      toast.success('링크가 복사되었습니다.');
    } catch (error) {
      toast.error('링크 복사에 실패했습니다.');
    }
  };

  return { copyUrlToClipboard, isCopied };
};

export default useCopyUrlToClipboard;
