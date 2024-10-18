const getDaysUntilRegistrationEnd = (registrationEnd: string) => {
  const today = new Date().setHours(0, 0, 0, 0); // 오늘의 날짜 (시간 0으로 설정)
  const endDate = new Date(registrationEnd).setHours(0, 0, 0, 0); // 종료 날짜 (시간 0으로 설정)

  // 날짜 차이를 밀리초로 계산하고 일 수로 변환
  const daysRemaining = (endDate - today) / (1000 * 60 * 60 * 24);

  return daysRemaining;
};

export default getDaysUntilRegistrationEnd;
