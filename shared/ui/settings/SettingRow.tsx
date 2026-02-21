import { ReactNode } from 'react';

type TSettingRowProps = {
  label: string;
  description?: string;
  children: ReactNode;
};

export const SettingRow = ({
  label,
  description,
  children,
}: TSettingRowProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium">{label}</span>
        <p className="text-muted text-xs leading-tight opacity-60">
          {description || null}
        </p>
      </div>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
};
