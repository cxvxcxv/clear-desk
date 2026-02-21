import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

type TToggleButtonProps = {
  isActive: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const ToggleButton = ({
  isActive,
  className,
  ...rest
}: TToggleButtonProps) => {
  return (
    <button
      className={clsx(
        'relative h-6 w-11 rounded-full transition-colors',
        isActive ? 'bg-primary' : 'bg-border',
        className,
      )}
      {...rest}
    >
      <div
        className={clsx(
          'absolute top-1 h-4 w-4 rounded-full bg-white transition-all',
          isActive ? 'left-6' : 'left-1',
        )}
      />
    </button>
  );
};
