module.exports = {
  testEnvironment: 'jest-environment-jsdom', // Jest가 테스트를 실행할 환경을 설정
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Jest가 테스트 실행 전에 실행할 파일을 지정
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  }, // Jest가 TypeScript 파일을 처리할 때 사용할 변환기를 지정
  testMatch: ['<rootDir>/src/**/*.(spec|test).[jt]s?(x)'], // 테스트 파일의 위치와 이름 패턴을 지정
};
