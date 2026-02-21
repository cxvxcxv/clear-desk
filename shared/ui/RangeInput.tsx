import { InputHTMLAttributes } from 'react';

type TRangeInputProps = {} & InputHTMLAttributes<HTMLInputElement>;

export const RangeInput = ({ ...rest }: TRangeInputProps) => {
  return <input type="range" {...rest} />;
};
