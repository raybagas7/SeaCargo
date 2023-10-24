import { useAdminEarnings } from "@/store/adminEarnings/useAdminEarnings";
import { currencyFormat } from "@/utils/currencyFormat";
import React from "react";

function TotalIncome() {
  const earning = useAdminEarnings.use.earningSeaCargo();
  return (
    <div className="grid flex-1  grid-rows-2 rounded-lg bg-prim-libg">
      <div className="grid grid-cols-3 gap-5 border-border-light p-5 dark:border-border-dark">
        <div className="grid grid-rows-2 gap-3 rounded-lg border-[1px] border-border-light p-5 shadow-md">
          <div>
            <h3 className="font-bold">Total Shipping Cost</h3>
            <p className="text-[2rem] text-prim-light">
              Rp {currencyFormat.format(earning?.total_shipping_cost as number)}
            </p>
          </div>
          <div>
            <h3 className="font-bold">Total Shipping Paid</h3>
            <p className="text-[2rem] text-prim-light">
              Rp {currencyFormat.format(earning?.total_shipping_paid as number)}
            </p>
          </div>
        </div>
        <div className="grid grid-rows-2 gap-3 rounded-lg border-[1px] border-border-light p-5 shadow-md">
          <div>
            <h3 className="font-bold">Total Shipping Pending</h3>
            <p className="text-[2rem] text-prim-light">
              Rp {currencyFormat.format(earning?.total_pending as number)}
            </p>
          </div>
          <div>
            <h3 className="font-bold">Total Insurance</h3>
            <p className="text-[2rem] text-prim-light">
              Rp{" "}
              {currencyFormat.format(
                (earning?.total_insurance as number) * 9000,
              )}
            </p>
          </div>
        </div>
        <div className="grid grid-rows-2 gap-3 rounded-lg border-[1px] border-border-light p-5 shadow-md">
          <div>
            <h3 className="font-bold">Total GoGreen</h3>
            <p className="text-[2rem] text-prim-light">
              Rp{" "}
              {currencyFormat.format((earning?.total_gogreen as number) * 1000)}
            </p>
          </div>
          <div>
            <h3 className="font-bold">Total Donation</h3>
            <p className="text-[2rem] text-prim-light">
              Rp{" "}
              {currencyFormat.format(
                (earning?.total_donation as number) * 5000,
              )}
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5 border-border-light p-5 dark:border-border-dark">
        <div className="grid grid-rows-2 gap-3 rounded-lg border-[1px] border-border-light p-5 shadow-md">
          <div>
            <h3 className="font-bold">Total TopUp Amount</h3>
            <p className="text-[2rem] text-prim-light">
              Rp {currencyFormat.format(earning?.total_topup_amount as number)}
            </p>
          </div>
          <div>
            <h3 className="font-bold">Total Cutted Amount</h3>
            <p className="text-[2rem] text-prim-light">
              Rp {currencyFormat.format(earning?.total_cutted_amount as number)}
            </p>
          </div>
        </div>
        <div className="rounded-lg border-[1px] border-border-light p-5 shadow-md">
          2
        </div>
        <div className="rounded-lg border-[1px] border-border-light p-5 shadow-md">
          3
        </div>
      </div>
    </div>
  );
}

export default TotalIncome;
