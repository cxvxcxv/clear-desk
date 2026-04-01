import clsx from 'clsx';
import { InputHTMLAttributes } from 'react';

type TCheckboxProps = {} & InputHTMLAttributes<HTMLInputElement>;

export const Checkbox = ({ className, ...rest }: TCheckboxProps) => {
  return (
    <label className="-m-2 cursor-pointer p-2">
      <input
        type="checkbox"
        className={clsx('cursor-pointer', className)}
        {...rest}
      />
    </label>
  );
};
