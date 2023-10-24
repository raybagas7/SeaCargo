import { usePayment } from "@/store/payment/usePayment";
import React from "react";
import { GiShipWheel } from "react-icons/gi";
import styles from "./PaymentList.module.scss";
import { formatDate } from "@/utils/formatDate";
import { currencyFormat } from "@/utils/currencyFormat";

function PaymentList() {
  const userPayments = usePayment.use.userPayments();

  if (!userPayments) {
    return (
      <div className="h-screen w-full">
        <div className="flex h-full w-full items-center justify-center">
          <GiShipWheel className="h-10 w-10 animate-spin text-prim-light" />
        </div>
      </div>
    );
  }

  return (
    <div className="px-10 text-sm  tablet:px-20 tablet:text-base semitablet:px-48">
      <div
        id="payment-list"
        className="overflow-x-scroll rounded-lg p-5 shadow-md tablet:overflow-visible "
      >
        <table className="w-full min-w-[1000px] table-fixed  text-left text-sm tablet:min-w-full">
          <thead>
            <tr className="border-b-[1px] border-border-light">
              <th className={`${styles.clamp} w-[15%] p-2`}>Shipping Name</th>
              <th className={`${styles.clamp} w-[15%] p-2`}>Base Cost</th>
              <th className={`${styles.clamp} w-[20%] p-2`}>Promo</th>
              <th className={`${styles.clamp} w-[10%] p-2`}>Discount</th>
              <th className={`${styles.clamp} w-[15%] p-2`}>Max Discount</th>
              <th className={`${styles.clamp} w-[15%] p-2`}>Final Cost</th>
              <th className={`${styles.clamp} w-[10%] p-2`}>Date</th>
            </tr>
          </thead>
          <tbody>
            {userPayments.map((payment) => (
              <tr
                key={payment.id}
                className=" cursor-pointer border-b-[1px] border-border-light hover:bg-prim-light/10 "
              >
                <td className="p-2">
                  <p className={`${styles.clamp}`}>{payment.shipping_name}</p>
                </td>
                <td className="p-2">
                  <p className={`${styles.clamp}`}>
                    Rp {currencyFormat.format(payment.base_cost)}
                  </p>
                </td>
                <td className="p-2">
                  <p className={`${styles.clamp}`}>{payment.promo_name}</p>
                </td>
                <td className="p-2">
                  <p className={`${styles.clamp}`}>{payment.discount}%</p>
                </td>
                <td className="p-2">
                  <p className={`${styles.clamp}`}>
                    Rp {currencyFormat.format(payment.max_discount as number)}
                  </p>
                </td>
                <td className="p-2">
                  <p className={`${styles.clamp}`}>
                    Rp {currencyFormat.format(payment.final_cost)}
                  </p>
                </td>
                <td className="p-2">
                  <p className={`${styles.clamp}`}>
                    {formatDate(payment.date)}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PaymentList;
