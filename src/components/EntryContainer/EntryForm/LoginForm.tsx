import React, { useState } from "react";
import { useRouter } from "next/router";
import { IUserLogin } from "@/interface/users";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { toastifySuccess } from "@/utils/toastifySuccess";
import { toastifyError } from "@/utils/toastifyError";
import { useLoading } from "@/store/loading/useLoading";

function LoginForm() {
  const route = useRouter();
  const { hideLoading, showLoading } = useLoading.getState();
  const [loginData, setLoginData] = useState<IUserLogin>({
    email: undefined,
    password: undefined,
  });

  const onLoginChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
  ) => {
    setLoginData({ ...loginData, [key]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      showLoading();
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ loginData }),
      });
      if (response.ok) {
        const data = await response.json();
        toastifySuccess(data.message);

        route.push("/user");
        hideLoading();
      } else {
        hideLoading();
        const data = await response.json();

        toastifyError(data.error);
      }
    } catch (error) {
      hideLoading();
      toastifyError(String(error));
    }
  };

  return (
    <>
      <h1 className="mb-5 text-center text-prim-litext dark:text-prim-dktext">
        LOGIN
      </h1>
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-3">
        <Input
          onChange={(e) => onLoginChange(e, "email")}
          value={loginData.email}
          normal
          wmax
          type="text"
          name="email-login"
          placeholder="Email"
        />
        <Input
          onChange={(e) => onLoginChange(e, "password")}
          value={loginData.password}
          normal
          wmax
          type="password"
          name="password-login"
          placeholder="Password"
        />
        <Button type="submit" wmax primary normal name="submit-login">
          Login
        </Button>
      </form>
    </>
  );
}

export default LoginForm;
