import { FC, TextareaHTMLAttributes, useState } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
  addOnBlur?: () => void;
}

const TextArea: FC<TextAreaProps> = ({
  name,
  label,
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
          className="block h-[160px] w-full resize-none rounded-lg border-[0.5px] border-prim-light p-4 text-xs outline-none tablet:text-base"
          {...rest}
        />
      </div>
    </>
  );
};

export default TextArea;
