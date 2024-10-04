export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}월 ${day}일`;
};

export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}시 ${minutes}분`;
};

// HH만 표현
export const formatTimeHours = (dateString: string): string => {
  const date = new Date(dateString);
  const hours = date.getHours();
  return `${hours}`;
};

// HH:mm 표현
export const formatTimeColon = (dateString: string): string => {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

// 오늘 날짜와 동일한지 check
export const isSameDate = (dateTime: string): boolean => {
  const targetDate = new Date(dateTime);
  const currentDate = new Date();

  return (
    targetDate.getFullYear() === currentDate.getFullYear() &&
    targetDate.getMonth() + 1 === currentDate.getMonth() + 1 &&
    targetDate.getDate() === currentDate.getDate()
  );
};

export const formatCalendarDate = (date: Date | null): string => {
  if (!date) return 'No date selected';

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

// 이전 날짜 및 이후 날짜 설정
export const adjustDate = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};
