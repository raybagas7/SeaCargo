import React, { InputHTMLAttributes } from "react";
import styles from "./InputImage.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

function InputImage({ name, ...rest }: InputProps) {
  return (
    <label
      htmlFor={name}
      className="flex w-full cursor-pointer items-end justify-center bg-black/30 py-2 text-white transition-colors hover:bg-black/20 hover:transition-colors"
    >
      <input
        id={name}
        type="file"
        accept="image/png, image/jpeg"
        className="hidden "
        {...rest}
      />
      <p className="text-center text-xs">Change</p>
    </label>
  );
}

export default InputImage;
