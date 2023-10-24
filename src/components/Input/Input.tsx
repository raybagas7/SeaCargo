import { FC, InputHTMLAttributes, useState } from "react";
import styles from "./Input.module.scss";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import classNames from "classnames";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  iconButton?: JSX.Element;
  minValue?: number;
  maxValue?: number;
  safeLength?: boolean;
  noWhiteSpace?: boolean;
  startWithNoSpace?: boolean;
  minValueInput?: (amount: number) => void;
  maxValueInput?: (amount: number) => void;
  textColor?: string;
  wmax?: boolean;
  normal?: boolean;
  small?: boolean;
  large?: boolean;
  noround?: boolean;
  meter?: React.ReactNode;
}

const Input: FC<InputProps> = ({
  name,
  label,
  iconButton,
  minValue,
  maxValue,
  textColor,
  wmax,
  normal,
  small,
  large,
  noround,
  meter,
  value,
  ...rest
}) => {
  const [showErrorMsg, setShowErrorMsg] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const inputClasses = classNames(styles.input, {
    [styles.textColor]: textColor,
    [styles.wmax]: wmax,
    [styles.inputNormal]: normal,
    [styles.inputSmall]: small,
    [styles.inputLarge]: large,
    [styles.inputMax]: wmax,
  });

  const inputContainer = classNames(styles.containerInput, {
    [styles.containerMax]: wmax,
  });

  return (
    <div>
      {label && (
        <label
          className="text-xs text-prim-light dark:text-prim-dark"
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <div className={`${inputContainer} relative dark:border-prim-dark`}>
        <input
          className={`${
            noround ? "rounded-tr-md" : "rounded-t-md "
          } ${inputClasses} dark:border-prim-dark dark:bg-prim-dkbg dark:text-prim-dark focus:dark:bg-prim-dark/30 focus:dark:text-prim-dktext`}
          name={name}
          id={name}
          value={value || ""}
          {...rest}
        ></input>
        {meter && (
          <div className="absolute bottom-1 right-3 text-prim-light dark:text-prim-dark">
            {meter}
          </div>
        )}
        {/* <p className="absolute bottom-1 right-3">Kg</p> */}
      </div>
      {showErrorMsg && <ErrorMessage message={errorMsg} />}
    </div>
  );
};

export default Input;
