import { useState } from 'react';

type PasswordCheck = {
  id: number;
  label: string;
  isValid: (password: string) => boolean;
};

type ItemProps = {
  item: PasswordCheck;
  password: string;
};

type Props = Omit<ItemProps, 'item'>;

const passwordFeedback: { [key: number]: string } = {
  0: 'weak',
  1: 'weak',
  2: 'medium',
  3: 'medium',
  4: 'strong',
};

const passwordValidatonList: PasswordCheck[] = [
  {
    id: 1,
    label: 'Must contain at least 8 characters.',
    isValid: (password: string) => password.length >= 8,
  },
  {
    id: 2,
    label: 'Must contain at least 1 number.',
    isValid: (password: string) => /\d/.test(password),
  },
  {
    id: 3,
    label: 'Must contain at least 1 uppercase letter.',
    isValid: (password: string) => /[A-Z]/.test(password),
  },
  {
    id: 4,
    label: 'Must contain at least 1 special character.',
    isValid: (password: string) => /[^a-zA-Z0-9]/.test(password),
  },
];

const PasswordValidationItem = ({ item, password }: ItemProps) => {
  const itemColor = !password.length
    ? 'text-gray-500'
    : item.isValid(password)
    ? 'text-green-500'
    : 'text-red-500';

  return <span className={itemColor}>{item.label}</span>;
};

const PasswordStrengthValidationList = ({ password }: Props) => {
  return (
    <div className='flex flex-col gap-1'>
      {passwordValidatonList.map((item) => (
        <PasswordValidationItem key={item.id} item={item} password={password} />
      ))}
    </div>
  );
};

const PasswordStrengthIndicator = ({ password }: Props) => {
  const passswordStrength = passwordValidatonList.filter((item) =>
    item.isValid(password)
  );

  return (
    <div className='flex flex-col gap-2 w-full'>
      <h3>{`Password is ${passwordFeedback[passswordStrength.length]}`} </h3>
      <div className='w-full h-2 bg-gray-500 rounded'>
        <div
          className={`w-${passswordStrength.length}/4 h-2 bg-green-500 rounded`}
        ></div>
      </div>
    </div>
  );
};

function App() {
  const [password, setPassword] = useState<string>('');

  return (
    <div className='flex items-center justify-center w-full h-screen'>
      <div className='flex flex-col gap-4 items-start w-1/4'>
        <h1 className='text-3xl'>Password Checker</h1>
        <input
          autoFocus
          type='password'
          placeholder='Enter password'
          className='w-full h-10 p-4 border border-gray-300 rounded-md'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <PasswordStrengthIndicator password={password} />
        <PasswordStrengthValidationList password={password} />
      </div>
    </div>
  );
}

export default App;
