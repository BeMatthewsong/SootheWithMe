const getDaysUntilRegistrationEnd = (registrationEnd: string) => {
  const today = new Date();
  const endDate = new Date(registrationEnd);

  // 두 날짜의 차이를 밀리초로 계산
  const timeDifference = endDate.getTime() - today.getTime();

  // 밀리초를 일 수로 변환 (하루 = 24 * 60 * 60 * 1000)
  const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return daysRemaining;
};

export default getDaysUntilRegistrationEnd;
