import React, { ButtonHTMLAttributes } from "react";
import styles from "./ThemeToggle.module.scss";
import classNames from "classnames";

interface IThemeToggle
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    React.ClassAttributes<HTMLButtonElement> {
  isDark: boolean;
}

function ThemeToggle({ isDark, ...rest }: IThemeToggle) {
  const containerClasses = classNames(styles.themeContainer, {
    [styles.darkModeContainer]: isDark,
    [styles.lightModeContainer]: !isDark,
  });

  const togglerClasses = classNames(styles.themeToggler, {
    [styles.darkModeToggler]: isDark,
    [styles.lightModeToggler]: !isDark,
  });

  return (
    <div className={containerClasses}>
      <button {...rest} className={togglerClasses}></button>
    </div>
  );
}

export default ThemeToggle;
