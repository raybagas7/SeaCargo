import { FC, InputHTMLAttributes, useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
}

const CheckBox: FC<InputProps> = ({ name, label, ...rest }) => {
  return (
    <div className="flex items-center gap-1">
      {label && (
        <label className="text-xs tablet:text-base" htmlFor={name}>
          {label}
        </label>
      )}
      <input
        className="cursor-pointer accent-prim-light dark:accent-prim-dark tablet:h-5 tablet:w-5"
        type="checkbox"
        name={name}
        id={name}
        {...rest}
      ></input>
    </div>
  );
};

export default CheckBox;
