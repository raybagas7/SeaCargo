import { useAdminEarnings } from "@/store/adminEarnings/useAdminEarnings";
import React from "react";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { FaShip, FaWallet } from "react-icons/fa";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { GiCargoShip, GiShipWreck } from "react-icons/gi";
import { MdPaid, MdPayments } from "react-icons/md";

function TotalRecap() {
  const earnings = useAdminEarnings.use.earningSeaCargo();
  return (
    <div className="relative flex h-52 overflow-hidden font-bold">
      <div className="animate-slide_right_continues grid w-full grid-cols-5 grid-rows-1">
        <div className="flex items-center justify-center p-5">
          <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-red-500/30 text-red-500">
            <GiShipWreck className="text-[4rem]" />
            <p>Canceled</p>
            <p>{earnings?.total_cancel}</p>
          </div>
        </div>
        <div className="flex items-center justify-center p-5">
          <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-blue-500/30 text-blue-500">
            <MdPaid className="text-[4rem]" />
            <p>Paid</p>
            <p>{earnings?.total_paid}</p>
          </div>
        </div>
        <div className="flex items-center justify-center p-5">
          <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-yellow-500/30 text-yellow-500">
            <FaHandHoldingDollar className="text-[4rem]" />
            <p>Unpaid</p>
            <p>{earnings?.total_unpaid}</p>
          </div>
        </div>
        <div className="flex items-center justify-center p-5">
          <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-orange-500/30 text-orange-500">
            <GiCargoShip className="text-[4rem]" />
            <p>Shippings</p>
            <p>{earnings?.total_shippings}</p>
          </div>
        </div>
        <div className="flex items-center justify-center p-5">
          <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-purple-500/30 text-purple-500">
            <MdPayments className="text-[4rem]" />
            <p>Payments</p>
            <p>{earnings?.total_payment}</p>
          </div>
        </div>
      </div>
      <div className=" animate-slide_right_following absolute grid h-full w-full  grid-cols-5 grid-rows-1">
        <div className="flex items-center justify-center p-5">
          <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-orange-500/30 text-orange-500">
            <GiCargoShip className="text-[4rem]" />
            <p>Shippings</p>
            <p>{earnings?.total_shippings}</p>
          </div>
        </div>
        <div className="flex items-center justify-center p-5">
          <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-purple-500/30 text-purple-500">
            <MdPayments className="text-[4rem]" />
            <p>Payments</p>
            <p>{earnings?.total_payment}</p>
          </div>
        </div>
        <div className="flex items-center justify-center p-5">
          <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-pink-500/30 text-pink-500">
            <FaWallet className="text-[4rem]" />
            <p>TopUp</p>
            <p>{earnings?.total_topup}</p>
          </div>
        </div>
        <div className="flex items-center justify-center p-5">
          <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-cyan-500/30 text-cyan-500">
            <FaShip className="text-[4rem]" />
            <p>Shipped</p>
            <p>{earnings?.total_shipped}</p>
          </div>
        </div>
        <div className="flex items-center justify-center p-5">
          <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-green-500/30 text-green-500">
            <BsFillBoxSeamFill className="text-[4rem]" />
            <p>Delivered</p>
            <p>{earnings?.total_delivered}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TotalRecap;
