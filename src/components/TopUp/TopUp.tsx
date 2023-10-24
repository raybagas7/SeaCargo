import React, { useEffect, useRef, useState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { currencyFormat } from "@/utils/currencyFormat";
import { useUser } from "@/store/user/useUser";
import { getCookie } from "cookies-next";
import Modal from "../Modal/Modal";
import { useModal } from "@/store/modal/useModal";
import History from "./History/History";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import CircleButton from "../CircleButton/CircleButton";

function TopUp() {
  const [amount, setAmount] = useState<number>();
  const Instant = [10000, 50000, 100000, 300000, 500000, 1000000];
  const onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseInt(e.target.value));
  };
  const { updateWalletBalance, postTopUp, getTopUp } = useUser.getState();
  const topUpData = useUser.use.topUpData();
  const { showModal } = useModal.getState();

  useEffect(() => {
    const token = getCookie("accessToken");
    getTopUp(token as string);
  }, []);

  const onChangeAmountInstant = (
    e: React.MouseEvent<HTMLButtonElement>,
    amountQuick: number,
  ) => {
    e.preventDefault();
    setAmount(amountQuick);
  };

  const handleSubmitTopUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = getCookie("accessToken");
    updateWalletBalance(token as string, amount as number);
    postTopUp(token as string, amount as number);
  };
  return (
    <>
      <Modal component={<History topupHistory={topUpData} />} />
      <form
        onSubmit={(e) => handleSubmitTopUp(e)}
        className="relative flex w-full max-w-[400px] flex-col items-center justify-center rounded-xl border-[0.5px] border-border-light bg-prim-libg p-5 shadow-md tablet:max-w-[500px]"
      >
        <p className=" text-[1.5rem] text-prim-litext">TopUp</p>
        <div className="my-5 w-full rounded-xl bg-second-libg p-3 text-center shadow-md">
          <p className="mb-2 text-white">Instant</p>
          <div className="grid grid-cols-3 gap-2">
            {Instant.map((instant) => (
              <Button
                key={instant}
                type="button"
                onClick={(e) => onChangeAmountInstant(e, instant)}
                small
                wmax
                secondary
                name={`${instant}`}
              >
                Rp {currencyFormat.format(instant)}
              </Button>
            ))}
          </div>
        </div>
        <Input
          onChange={onChangeAmount}
          value={amount}
          type="number"
          required
          name="topup_balace"
          normal
          min="1"
          label="Amount"
        />
        <div className="mt-5 w-full">
          <Button type="submit" name="pay_topup" primary normal wmax>
            Pay
          </Button>
        </div>
        <div className="absolute -right-3 -top-3">
          <CircleButton name="show-topup" type="button" onClick={showModal}>
            <HiOutlineClipboardDocumentList />
          </CircleButton>
        </div>
      </form>
    </>
  );
}

export default TopUp;
