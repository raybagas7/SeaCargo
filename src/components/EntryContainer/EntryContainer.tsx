import React, { useState } from "react";
import Button from "../Button/Button";
import classNames from "classnames";
import styles from "./EntryContainer.module.scss";
import RegisterForm from "./EntryForm/RegisterForm";
import LoginForm from "./EntryForm/LoginForm";

function EntryContainer() {
  const [toggleEntry, setToggleEntry] = useState({
    login: true,
    register: false,
  });

  const handleToggleEntry = () => {
    setToggleEntry({
      login: !toggleEntry.login,
      register: !toggleEntry.register,
    });
  };

  const containerClassesRegister = classNames(styles.container, {
    [styles.slideLeft]: !toggleEntry.register,
    [styles.slideRight]: toggleEntry.register,
  });
  const containerClassesLogin = classNames(styles.container, {
    [styles.slideLeft]: !toggleEntry.login,
    [styles.slideRight]: toggleEntry.login,
  });
  const wrapperClasses = classNames(styles.wrapper);

  return (
    <div className="relative h-[100vh] max-tablet:flex max-tablet:w-full max-tablet:justify-center">
      <div className={containerClassesRegister}>
        <div
          className={`${wrapperClasses} dark:border-border-dark dark:bg-prim-dkbg`}
        >
          <RegisterForm />
          <div className="mt-5 flex justify-end">
            <Button
              name="register-switch"
              secondary
              small
              onClick={handleToggleEntry}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
      <div className={containerClassesLogin}>
        <div
          className={`${wrapperClasses} dark:border-border-dark dark:bg-prim-dkbg`}
        >
          <LoginForm />
          <div className="mt-5 flex justify-end">
            <Button
              name="login-switch"
              secondary
              small
              onClick={handleToggleEntry}
            >
              Register
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EntryContainer;
