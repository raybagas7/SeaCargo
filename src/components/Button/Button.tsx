import { ButtonHTMLAttributes, FC, useEffect, useRef } from "react";
import styles from "./Button.module.scss";
import classNames from "classnames";

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

const Button: FC<ButtonProps> = ({
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
  // const buttonRef = useRef<HTMLButtonElement | null>(null);

  const buttonClasses = classNames(styles.button, {
    [styles.primaryButton]: primary,
    [styles.secondaryButton]: secondary,
    [styles.textColor]: textColor,
    [styles.wmax]: wmax,
    [styles.buttonNormal]: normal,
    [styles.buttonSmall]: small,
    [styles.buttonLarge]: large,
    [styles.buttonMax]: wmax,
    [styles.buttonPrimHover]: primary,
    [styles.buttonSecHover]: secondary,
  });

  return (
    <button
      // ref={buttonRef}
      name={name}
      className={`${buttonClasses} 
      ${
        primary &&
        "dark:border-prim-dark dark:bg-prim-dark dark:text-prim-dktext hover:dark:border-prim-dark hover:dark:bg-prim-dkbg hover:dark:text-prim-dark"
      }
      ${
        secondary &&
        "dark:border-[1px] dark:border-prim-dark dark:bg-prim-dkbg dark:text-prim-dark hover:dark:-translate-y-1 hover:dark:border-[1px] hover:dark:border-prim-dark hover:dark:bg-prim-dark hover:dark:text-prim-libg hover:dark:shadow-huge-up hover:dark:transition"
      }`}
      {...rest}
    >
      {children && children}
      {component && component}
    </button>
  );
};

export default Button;
