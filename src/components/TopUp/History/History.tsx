import { ITopUp } from "@/interface/wallet";
import { formatDate } from "@/utils/formatDate";
import React from "react";
import { currencyFormat } from "@/utils/currencyFormat";

interface IHistory {
  topupHistory: ITopUp[] | undefined;
}

function History({ topupHistory }: IHistory) {
  if (!topupHistory) {
    return (
      <div>
        <p className="text-xl font-bold">No TopUp Data</p>
      </div>
    );
  }

  return (
    <div
      className=" max-h-[60vh] min-w-[85vw] overflow-y-scroll px-[1.5rem] py-[2.5rem] tablet:min-w-[40vw]"
      id="topup-history"
    >
      <table className={`h-full w-full text-xs`}>
        <thead>
          <tr className="bg-prim-light/50">
            <th className="w-[30%] border-[1px] border-prim-light px-1 py-2">
              Amount
            </th>
            <th className="w-[30%] border-[1px] border-prim-light px-1 py-2">
              To
            </th>
            <th className="w-[40%] border-[1px] border-prim-light px-1 py-2">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {topupHistory.map((history, index) => (
            <tr
              key={history.id}
              className={`${
                index % 2 === 0 && "bg-sec-light/30"
              } cursor-pointer hover:bg-prim-light/50`}
            >
              <td className="border-[1px] border-prim-light px-1 py-2">
                Rp. {currencyFormat.format(history.amount)}
              </td>
              <td className="border-[1px] border-prim-light px-1 py-2">
                {history.toWallet}
              </td>
              <td className="border-[1px] border-prim-light px-1 py-2">
                {formatDate(history.date)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default History;
