import { z } from 'zod';

const passwordPattern = /^(?=.*\d)[A-Za-z\d]{8,}$/; //숫자와 문자를 포함하여 8자 이상인지 검사하는 정규식

export const signinSchema = z.object({
  email: z
    .string()
    .min(1, { message: '이메일을 입력해주세요.' })
    .email('이메일 형식을 입력해주세요.'),
  password: z.string().min(1, { message: '비밀번호를 입력해주세요.' }),
});

export const signupSchema = z
  .object({
    name: z.string().min(1, { message: '이름을 입력해주세요.' }),
    email: z
      .string()
      .min(1, { message: '이메일을 입력해주세요.' })
      .email('이메일 형식을 입력해주세요.'),
    companyName: z.string().min(1, { message: '회사명을 입력해주세요.' }),
    password: z
      .string()
      .min(1, { message: '비밀번호를 입력해 주세요.' })
      .regex(new RegExp(passwordPattern), {
        message: '비밀번호는 영문과 숫자가 포함된 8자 이상이 되도록 해 주세요.',
      }),
    passwordCheck: z.string().min(1, { message: '비밀번호를 입력해 주세요.' }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordCheck'], // 오류 메시지가 passwordCheck 필드와 연결되도록 설정
  });

/* 오류 메시지 스타일링 */
export const errorMessageStyle = 'animate-bounce text-var-red text-14 mt-4';
