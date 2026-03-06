import { InputHTMLAttributes } from 'react';

type TCheckboxProps = {} & InputHTMLAttributes<HTMLInputElement>;

export const Checkbox = ({ ...rest }: TCheckboxProps) => {
  return <input type="checkbox" className="cursor-pointer" {...rest} />;
};
