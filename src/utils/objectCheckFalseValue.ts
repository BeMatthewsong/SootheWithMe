// 모든 gatheringType이 false인지 확인 (boolean)

const objectCheckFalseValue = (obj: Record<string, boolean>): boolean => {
  return Object.values(obj).every((value) => value === false);
};

export default objectCheckFalseValue;
