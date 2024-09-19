import {
  formatDate,
  formatTime,
  formatTimeHours,
  formatTimeColon,
  isSameDate,
} from './formatDate';

const DATE_STRING = '2024-09-11T19:30:00';
const NOT_DATE_STRING = 'NOT_DATE_STRING';

describe('formatDate', () => {
  it('should format as `m월 dd일`', () => {
    expect(formatDate(DATE_STRING)).toBe('9월 11일');
  });

  it('should return `NaN월 NaN일` for an invalid date string', () => {
    expect(formatDate(NOT_DATE_STRING)).toBe('NaN월 NaN일');
  });
});

describe('formatTime', () => {
  it('should format as `HH시 mm분`', () => {
    expect(formatTime(DATE_STRING)).toBe('19시 30분');
  });

  it('should return `NaN시 NaN분`', () => {
    expect(formatTime(NOT_DATE_STRING)).toBe('NaN시 NaN분');
  });
});

describe('formatTimeHours', () => {
  it('should format as `HH`', () => {
    expect(formatTimeHours(DATE_STRING)).toBe('19');
  });

  it('should return `NaN`', () => {
    expect(formatTimeHours(NOT_DATE_STRING)).toBe('NaN');
  });
});

describe('formatTimeColon', () => {
  it('should format as `HH:mm`', () => {
    expect(formatTimeColon(DATE_STRING)).toBe('19:30');
  });

  it('should return `NaN:NaN`', () => {
    expect(formatTimeColon(NOT_DATE_STRING)).toBe('NaN:NaN');
  });
});

describe('isSameDate', () => {
  it('should return true if the date is the same as today', () => {
    const today = new Date().toISOString();
    expect(isSameDate(today)).toBe(true);
  });

  it('should return false if the date is not the same as today', () => {
    expect(isSameDate(DATE_STRING)).toBe(false);
  });

  it('should return false', () => {
    expect(isSameDate(NOT_DATE_STRING)).toBe(false);
  });
});
