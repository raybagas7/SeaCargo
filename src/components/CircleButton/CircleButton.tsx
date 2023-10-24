import { ButtonHTMLAttributes, FC, useEffect, useRef } from "react";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    React.ClassAttributes<HTMLButtonElement> {
  name: string;
  primary?: boolean;
  secondary?: boolean;
  textColor?: string;
  component?: React.ReactNode;
  wmax?: boolean;
  normal?: boolean;
  small?: boolean;
  large?: boolean;
}

const CircleButton: FC<ButtonProps> = ({
  name,
  primary,
  secondary,
  textColor,
  component,
  wmax,
  normal,
  small,
  large,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button
      name={name}
      className={`z-50 flex animate-default_quantum_bouncing cursor-pointer items-center justify-center rounded-full border-[1px] border-prim-light bg-prim-light p-1 text-prim-libg transition-colors hover:bg-prim-libg hover:text-prim-light hover:transition-colors`}
      {...rest}
    >
      {children && children}
      {component && component}
    </button>
  );
};

export default CircleButton;
