import clsx from 'clsx';
import { OptionHTMLAttributes } from 'react';

export const Option = ({
  className,
  children,
  ...rest
}: OptionHTMLAttributes<HTMLOptionElement>) => {
  return (
    <option className={clsx('bg-card text-sm', className)} {...rest}>
      {children}
    </option>
  );
};
