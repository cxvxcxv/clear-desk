import { ComponentPropsWithoutRef } from 'react';

type TProgressProps = {
  value: number;
  max: number;
  min?: number;
} & ComponentPropsWithoutRef<'div'>;

export const Progress = ({ value, min = 0, max }: TProgressProps) => {
  const percentage = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="w-full">
      <div
        className="bg-border h-2 w-full overflow-hidden rounded-full"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
      >
        <div
          className="bg-foreground h-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
