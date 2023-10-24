import React from "react";
import Button from "../Button/Button";
import { useRouter } from "next/router";
import { useShipping } from "@/store/shipping/useShipping";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { currencyFormat } from "@/utils/currencyFormat";
import { useModal } from "@/store/modal/useModal";
import { TbGiftCardFilled } from "react-icons/tb";

function SuccessPayment() {
  const router = useRouter();
  const { showModal4 } = useModal.getState();
  const paymentDetail = useShipping.use.paymentDetail();
  const randomGames = Math.random() < 0.3;

  if (!paymentDetail) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-h-[90vh] max-w-[20rem] px-[1.5rem] py-[2.5rem] text-prim-litext dark:bg-prim-dkbg dark:text-prim-dktext tablet:w-[25rem] tablet:max-w-none">
      <p className="mb-5 text-center text-lg font-bold text-prim-light dark:bg-prim-dark">
        Payment Success
      </p>
      <div className="mb-5 flex flex-col items-center justify-center gap-5 text-xs tablet:text-base">
        <BsFillPatchCheckFill className="h-10 w-10 animate-default_quantum_bouncing text-prim-light dark:text-prim-dark" />
        <div className="flex w-[12rem] tablet:w-full">
          <div className="flex-1 space-y-2">
            <p>Shipping Name</p>
            <p>Base Cost</p>
            <p>Discount</p>
            <p>Max Discount</p>
            <p>Referal</p>
            <p>Final Cost</p>
          </div>
          <div className="flex-1 space-y-2 text-right">
            <p>{paymentDetail.shipping_name}</p>
            <p>Rp {currencyFormat.format(paymentDetail.base_cost)}</p>
            <p>{paymentDetail.discount}%</p>
            <p>
              Rp{" "}
              {currencyFormat.format(
                paymentDetail.max_discount ? paymentDetail.max_discount : 0,
              )}
            </p>
            <p>
              {paymentDetail.referal ? paymentDetail.referal : "No referal"}
            </p>
            <p>Rp {currencyFormat.format(paymentDetail.final_cost)}</p>
          </div>
        </div>
      </div>
      <div className="relative flex justify-center">
        <Button
          onClick={() => {
            router.reload();
          }}
          primary
          normal
          name="goto-payments"
        >
          Confirm
        </Button>
        {randomGames && (
          <TbGiftCardFilled
            onClick={showModal4}
            className="absolute right-0 h-10 w-10 animate-bounce cursor-pointer text-yellow-500 hover:animate-none"
          />
        )}
      </div>
    </div>
  );
}

export default SuccessPayment;
