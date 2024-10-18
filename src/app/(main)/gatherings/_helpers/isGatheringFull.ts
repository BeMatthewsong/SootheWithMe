const isGatheringFull = (
  participantCount: number,
  capacity: number,
): boolean => {
  return participantCount >= capacity;
};

export default isGatheringFull;
