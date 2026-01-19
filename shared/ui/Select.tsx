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
        'border-border scrollbar-thin scrollbar-track-background scrollbar-thumb-border cursor-pointer appearance-none scroll-smooth rounded-sm p-2 px-4',
        className,
      )}
      {...rest}
    >
      {children}
    </select>
  );
};
