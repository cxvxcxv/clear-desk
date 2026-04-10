import clsx from 'clsx';
import { SelectHTMLAttributes } from 'react';

export const Select = ({
  id,
  className,
  children,
  ...rest
}: SelectHTMLAttributes<HTMLSelectElement>) => {
  return (
    <select
      id={id}
      className={clsx(
        'border-border cursor-pointer appearance-none rounded-sm p-2 px-4',
        className,
      )}
      {...rest}
    >
      {children}
    </select>
  );
};
