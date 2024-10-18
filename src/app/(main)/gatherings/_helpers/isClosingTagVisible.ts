import { CLOSING_IN_A_WEEK } from '@/constants/common';

const isClosingTagVisible = (
  daysLeft: number,
  isGatheringFull: boolean,
): boolean => {
  return daysLeft <= CLOSING_IN_A_WEEK || isGatheringFull;
};

export default isClosingTagVisible;
