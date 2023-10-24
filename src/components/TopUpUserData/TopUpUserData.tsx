import { formatIDR } from "@/utils/formatIDR";
import React from "react";
import Button from "../Button/Button";
import { toastifyInfo } from "@/utils/toastifyInfo";

interface ITopUpUserData {
  photo: string;
  fullname: string;
  phone: number;
  referal: string;
  balance: number;
}

function TopUpUserData({
  photo,
  fullname,
  phone,
  referal,
  balance,
}: ITopUpUserData) {
  const onClickReferal = () => {
    navigator.clipboard.writeText(referal);
    toastifyInfo(`Referal copied: ${referal}`);
  };

  return (
    <>
      <img src={photo} className="h-16 w-16 rounded-full object-cover" />
      <div className="mt-3 space-y-1 text-center text-white">
        <p className="text-[1.5rem] font-bold">{fullname}</p>
        <p>{phone}</p>
        <Button
          type="button"
          onClick={onClickReferal}
          secondary
          small
          name="referal"
        >
          Referal Code: {referal}
        </Button>
      </div>
      <div className="mt-5 font-bold text-white">
        <p className="text-[2rem]">{formatIDR.format(balance)}</p>
      </div>
    </>
  );
}

export default TopUpUserData;
