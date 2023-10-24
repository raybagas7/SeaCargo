import { FC, TextareaHTMLAttributes, useState } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
  small?: boolean;
  addOnBlur?: () => void;
}

const TextArea: FC<TextAreaProps> = ({
  name,
  label,
  small,
  value,
  addOnBlur,
  ...rest
}) => {
  return (
    <>
      <div>
        <label className={`text-xs text-prim-light`} htmlFor={name}>
          {label}
        </label>
        <textarea
          value={value}
          id={name}
          className={`${
            small ? "h-[80px] text-xs" : "h-[160px] text-xs tablet:text-base"
          } block  w-full resize-none rounded-lg border-[0.5px] border-prim-light p-4 outline-none`}
          {...rest}
        />
      </div>
    </>
  );
};

export default TextArea;
