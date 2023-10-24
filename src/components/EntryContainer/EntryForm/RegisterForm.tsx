import React, { useState } from "react";
import { useRouter } from "next/router";
import { IUserRegister } from "@/interface/users";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { toastifySuccess } from "@/utils/toastifySuccess";
import { toastifyError } from "@/utils/toastifyError";
import { useLoading } from "@/store/loading/useLoading";

function RegisterForm() {
  const route = useRouter();
  const { hideLoading, showLoading } = useLoading.getState();
  const [registerData, setRegisterData] = useState<IUserRegister>({
    email: undefined,
    password: undefined,
    fullname: undefined,
    phone: undefined,
  });

  const onRegisterChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
  ) => {
    setRegisterData({ ...registerData, [key]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      showLoading();
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ registerData }),
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
      <h1 className="mb-5 text-center text-lg font-bold text-prim-light dark:text-prim-dark">
        REGISTER
      </h1>
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-3">
        <Input
          onChange={(e) => onRegisterChange(e, "email")}
          value={registerData.email}
          normal
          wmax
          type="text"
          name="email-register"
          placeholder="Email"
        />
        <Input
          onChange={(e) => onRegisterChange(e, "password")}
          value={registerData.password}
          normal
          wmax
          type="password"
          name="password-register"
          placeholder="Password"
        />
        <Input
          onChange={(e) => onRegisterChange(e, "fullname")}
          value={registerData.fullname}
          normal
          wmax
          type="text"
          name="fullname-register"
          placeholder="Fullname"
          minLength={3}
          required
        />
        <div className="flex w-full">
          <div className=" flex w-10 items-center justify-center rounded-l-lg bg-prim-light text-white dark:bg-prim-dark">
            <p>62</p>
          </div>
          <div className="flex-1">
            <Input
              onChange={(e) => onRegisterChange(e, "phone")}
              value={registerData.phone}
              normal
              wmax
              noround
              type="number"
              name="phone-register"
              placeholder="Phone"
              required
            />
          </div>
        </div>
        <Button type="submit" wmax primary normal name="submit-register">
          Register
        </Button>
      </form>
    </>
  );
}

export default RegisterForm;
