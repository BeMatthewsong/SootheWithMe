export interface SignUpData {
  name: string;
  email: string;
  company: string;
  password: string;
  passwordCheck: string;
}

export interface SignInData extends Pick<SignUpData, 'email' | 'password'> {}
