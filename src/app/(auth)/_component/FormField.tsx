import Input from '../../components/Input/Input';
import { errorMessageStyle } from './FormOptions';

interface SignUpData {
  name: string;
  email: string;
  companyName: string;
  password: string;
  passwordCheck: string;
}

interface FormFieldProps {
  label: string;
  name: keyof SignUpData;
  placeholder: string;
  register: any;
  error?: string;
  type?: string;
}

const FormField = ({
  label,
  name,
  placeholder,
  register,
  error,
  type = 'text',
}: FormFieldProps) => {
  return (
    <div className='flex flex-col gap-4'>
      <label className='text-14 font-semibold'>{label}</label>
      <Input
        placeholder={placeholder}
        className='h-44'
        hasError={!!error}
        type={type}
        isPassword={type === 'password'}
        {...register(name)}
      />
      {error && <div className={errorMessageStyle}>{error}</div>}
    </div>
  );
};

export default FormField;
