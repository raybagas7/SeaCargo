import { useShipping } from "@/store/shipping/useShipping";
import React from "react";
import { GiShipWheel } from "react-icons/gi";
import { FaShip } from "react-icons/fa";
import {
  FaFlag,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaHourglassHalf,
} from "react-icons/fa";
import { BiSolidDollarCircle } from "react-icons/bi";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { AiOutlineFieldTime } from "react-icons/ai";
import { GiShipWreck } from "react-icons/gi";
import { currencyFormat } from "@/utils/currencyFormat";
import Modal from "../Modal/Modal";
import ShippingDetails from "../ShippingDetails/ShippingDetails";
import { useModal } from "@/store/modal/useModal";
import SecondModal from "../SecondModal/SecondModal";
import PromoList from "../PromoList/PromoList";
import ThirdModal from "../ThirdModal/ThirdModal";
import SuccessPayment from "../SuccessPayment/SuccessPayment";
import ShippingStatus from "../ShippingStatus/ShippingStatus";
import ForthModal from "../ForthModal/ForthModal";
import GamesLayout from "../GamesLayout/GamesLayout";

function ShippingsList() {
  const selectedShippingId = useShipping.use.selectedShippingId();
  const shippingsData = useShipping.use.shippingsData();
  const { setSelectedShippingId } = useShipping.getState();
  const { showModal } = useModal.getState();

  if (!shippingsData) {
    return (
      <div className="h-screen w-full">
        <div className="flex h-full w-full items-center justify-center">
          <GiShipWheel className="h-10 w-10 animate-spin text-prim-light" />
        </div>
      </div>
    );
  }

  const handleOnClickShipping = (shippingId: string) => {
    setSelectedShippingId(shippingId);
    showModal();
  };

  return (
    <>
      {selectedShippingId && (
        <>
          <Modal
            component={<ShippingDetails shippingId={selectedShippingId} />}
          />
          <SecondModal component={<PromoList />} />
          <ThirdModal component={<SuccessPayment />} />
          <ForthModal component={<GamesLayout />} />
        </>
      )}
      <div className="px-10 text-sm tablet:px-20 tablet:text-base semitablet:px-48">
        <div className="grid w-full grid-cols-1 gap-3 mobile:grid-cols-2  md:grid-cols-3 tablet:grid-cols-4 semitablet:grid-cols-5">
          {shippingsData?.map((shipping) => (
            <div
              key={shipping.id}
              onClick={() => handleOnClickShipping(shipping.id)}
              className="cursor-pointer rounded-lg border-[0.5px] border-border-light bg-prim-libg p-3 shadow-md transition hover:shadow-lg hover:transition dark:border-border-dark dark:bg-prim-dkbg dark:text-prim-dktext dark:shadow dark:shadow-white/10 dark:hover:shadow-md dark:hover:shadow-white/10"
            >
              <p className="overflow-hidden text-ellipsis whitespace-nowrap border-b-2 pb-1 text-center font-bold">
                {shipping.name}
              </p>
              <div className="flex gap-1 border-b-2">
                <div className="my-2 w-[50%] space-y-2 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="h-4 w-4 text-blue-500">
                      <FaFlag lassName="h-4 w-4" />
                    </div>
                    <p className="overflow-hidden text-ellipsis whitespace-nowrap text-center">
                      {shipping.from.province}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-4 w-4 text-red-500">
                      <FaMapMarkerAlt className="h-4 w-4" />
                    </div>
                    <p className="overflow-hidden text-ellipsis whitespace-nowrap text-center ">
                      {shipping.to.province}
                    </p>
                  </div>
                </div>
                <div className="mt-2 w-[50%] space-y-2 text-xs">
                  <div className="flex w-full items-center justify-end gap-1">
                    {shipping.paid ? (
                      <>
                        <div className="h-4 w-4 text-prim-light dark:text-prim-dark">
                          <FaCheckCircle className="h-4 w-4" />
                        </div>
                        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-center ">
                          Paid
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="h-4 w-4 text-yellow-500">
                          <BiSolidDollarCircle className="h-4 w-4" />
                        </div>
                        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-center ">
                          Unpaid
                        </p>
                      </>
                    )}
                  </div>
                  <div className="flex w-full items-center justify-end gap-1">
                    <p className="overflow-hidden text-ellipsis whitespace-nowrap text-center ">
                      Rp. {currencyFormat.format(shipping.totalCost)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-2 flex justify-between">
                <ShippingStatus
                  delivered={shipping.delivered}
                  paid={shipping.paid}
                  shipped={shipping.shipped}
                  cancel={shipping.cancel}
                />
                <div className="flex max-w-[50%] items-center gap-1 text-xs">
                  <div
                    className={`h-4 w-4 ${
                      shipping.delivered ? "text-green-500" : "text-orange-500"
                    }`}
                  >
                    <AiOutlineFieldTime className="h-4 w-4" />
                  </div>
                  <p className="overflow-hidden text-ellipsis whitespace-nowrap text-center ">
                    {shipping.etd} Days
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ShippingsList;
