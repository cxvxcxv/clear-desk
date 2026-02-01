import clsx from 'clsx';

type TCircularProgressProps = {
  value: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
};

export const CircularProgress = ({
  value,
  size = 120,
  strokeWidth = 8,
  className,
}: TCircularProgressProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * value;

  return (
    <svg
      width={size}
      height={size}
      className={clsx('block', className)}
      aria-hidden
    >
      {/* track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="currentColor"
        strokeOpacity={0.15}
        strokeWidth={strokeWidth}
        fill="none"
      />

      {/* progress */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dashoffset 0.5s linear' }}
      />
    </svg>
  );
};
