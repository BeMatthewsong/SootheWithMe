// true인 key 값만 필터링해서 문자열로 반환하는 함수

const objectExtractTrueValue = (obj: Record<string, boolean>) => {
  const selectedGatheringType = String(
    Object.keys(obj).filter((key) => obj[key]),
  );
  return selectedGatheringType;
};

export default objectExtractTrueValue;
