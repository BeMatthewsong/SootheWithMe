const getTagMessage = (daysLeft: number | null, endTime?: string) => {
  if (daysLeft === null) return '';

  if (daysLeft < 0) {
    return '마감된 모임입니다.';
  } else if (daysLeft === 0) {
    return `오늘 ${endTime}시 마감`;
  } else {
    return `${daysLeft}일 후 마감`;
  }
};

export default getTagMessage;
