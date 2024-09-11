const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //이메일 형식 검사하는 정규식
const passwordPattern = /^(?=.*\d)[A-Za-z\d]{8,}$/; //숫자와 문자를 포함하여 8자 이상인지 검사하는 정규식

export const FORM_OPTIONS = {
  /* 이메일 유효성 검사 */
  email: {
    name: 'email' as const,
    placeholder: '이메일을 입력해 주세요.',
    rules: {
      required: '이메일을 입력해 주세요.',
      pattern: {
        value: emailPattern,
        message: '올바른 이메일 주소가 아닙니다.',
      },
    },
  },
  /* 로그인시 비밀번호 유효성 검사 */
  loginPassword: {
    name: 'password' as const,
    placeholder: '비밀번호를 입력해 주세요',
    rules: {
      required: '비밀번호를 입력해 주세요.',
    },
  },
  /* 이름 유효성 검사 */
  nameCheck: {
    name: 'name' as const,
    placeholder: '이름을 입력해 주세요',
    rules: {
      required: '이름을 입력해 주세요.',
    },
  },
  /* 회사명 유효성 검사 */
  companyName: {
    name: 'company' as const,
    placeholder: '회사명을 입력해 주세요.',
    rules: {
      required: '회사명을 입력해 주세요.',
    },
  },
  /* 회원가입시 비밀번호 유효성 검사 */
  password: {
    name: 'password' as const,
    placeholder: '비밀번호를 입력해 주세요',
    rules: {
      required: '비밀번호를 입력해 주세요.',
      pattern: {
        value: passwordPattern,
        message: '비밀번호가 8자 이상이 되도록 해 주세요.',
      },
    },
  },
  /* 회원가입시 비밀번호 확인 유효성 검사 */
  passwordCheck: {
    name: 'passwordCheck' as const,
    placeholder: '비밀번호를 다시 한 번 입력해주세요.',
    rules: {
      required: '비밀번호를 입력해 주세요.',
      validate: (value: string, formValues: { password: string }) =>
        value === formValues.password || '비밀번호가 일치하지 않습니다.',
    },
    validateMsg: '비밀번호가 일치하지 않습니다.',
  },

  /* 오류 메시지 스타일링 */
  errorMessageStyle: 'text-var-red text-14 mt-4',
};

export default FORM_OPTIONS;
