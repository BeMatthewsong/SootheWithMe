import { z } from 'zod';

const PASSWORD_PATTERN = new RegExp(/^(?=.*\d)[A-Za-z\d]{8,}$/); //숫자와 문자를 포함하여 8자 이상인지 검사하는 정규식

// 에러 메시지 상수
const ERROR_MESSAGES = {
  REQUIRED_EMAIL: '이메일을 입력해주세요.',
  INVALID_EMAIL: '이메일 형식을 입력해주세요.',
  REQUIRED_PASSWORD: '비밀번호를 입력해주세요.',
  REQUIRED_NAME: '이름을 입력해주세요.',
  REQUIRED_COMPANY: '회사명을 입력해주세요.',
  INVALID_PASSWORD:
    '비밀번호는 영문과 숫자가 포함된 8자 이상이 되도록 해 주세요.',
  PASSWORD_MISMATCH: '비밀번호가 일치하지 않습니다.',
};

export const signinSchema = z.object({
  email: z
    .string()
    .min(1, { message: ERROR_MESSAGES.REQUIRED_EMAIL })
    .email(ERROR_MESSAGES.INVALID_EMAIL),
  password: z.string().min(1, { message: ERROR_MESSAGES.REQUIRED_PASSWORD }),
});

export const signupSchema = z
  .object({
    name: z.string().min(1, { message: ERROR_MESSAGES.REQUIRED_NAME }),
    email: z
      .string()
      .min(1, { message: ERROR_MESSAGES.REQUIRED_EMAIL })
      .email(ERROR_MESSAGES.INVALID_EMAIL),
    companyName: z.string().min(1, { message: ERROR_MESSAGES.REQUIRED_EMAIL }),
    password: z
      .string()
      .min(1, { message: ERROR_MESSAGES.REQUIRED_PASSWORD })
      .regex(PASSWORD_PATTERN, {
        message: ERROR_MESSAGES.INVALID_PASSWORD,
      }),
    passwordCheck: z
      .string()
      .min(1, { message: ERROR_MESSAGES.REQUIRED_PASSWORD }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: ERROR_MESSAGES.REQUIRED_PASSWORD,
    path: ['passwordCheck'], // 오류 메시지가 passwordCheck 필드와 연결되도록 설정
  });

/* 오류 메시지 스타일링 */
export const errorMessageStyle = 'animate-bounce text-var-red text-14 mt-4';
