import React, { useEffect } from "react";
import { getCookie } from "cookies-next";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { FaFlag, FaMapMarkerAlt } from "react-icons/fa";
import { FaHourglassHalf, FaShip } from "react-icons/fa";
import { GiShipWreck } from "react-icons/gi";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { currencyFormat } from "@/utils/currencyFormat";
import ShippingStatus from "../ShippingStatus/ShippingStatus";
import { useAdminShipping } from "@/store/adminShipping/useAdminShipping";
import { calculateDiscount } from "@/utils/calculateDiscount";
import UpdateButton from "../UpdateButton/UpdateButton";

interface IAdminShippingDetails {
  trigger: boolean;
  triggerUseEffect: () => void;
}

function AdminShippingDetails({
  trigger,
  triggerUseEffect,
}: IAdminShippingDetails) {
  const selectedShippingId = useAdminShipping.use.selectedShippingId();
  const paymentDetail = useAdminShipping.use.paymentDetail();
  const shippingDetails = useAdminShipping.use.shippingDetails();
  const token = getCookie("accessToken");
  const { getShippingDetails, getPaymentDetails, changeShippingStatus } =
    useAdminShipping.getState();

  const handleOnChangeStatus = (
    cancel: boolean,
    shipped: boolean,
    delivered: boolean,
  ) => {
    changeShippingStatus(
      token as string,
      selectedShippingId as string,
      cancel,
      shipped,
      delivered,
    );
    triggerUseEffect();
    // getPaymentDetails(token as string, selectedShippingId as string);
  };

  useEffect(() => {
    getShippingDetails(token as string, selectedShippingId as string);
  }, [selectedShippingId, trigger]);

  if (!shippingDetails) {
    return <LoadingSpinner />;
  }

  return (
    <div
      className="max-h-[90vh] w-[85vw] overflow-y-scroll scroll-smooth rounded-xl px-[1.5rem] py-[2.5rem] text-prim-litext dark:bg-prim-dkbg dark:text-prim-dktext tablet:w-[60vw]"
      id="payment-detail"
    >
      <h2 className="mb-5 text-center text-xl font-bold text-prim-light dark:text-prim-dark">
        Shipping Details
      </h2>
      {/*Shipping From To*/}
      <div className="flex w-full flex-col items-center tablet:flex-row">
        {/*From*/}
        <div className="w-full rounded-lg border-[0.5px] border-border-light p-3 shadow-md dark:border-border-dark dark:shadow dark:shadow-white/10">
          <div className="items-center gap-2">
            <div className="flex items-center gap-2">
              <FaFlag className="text-blue-500" />
              <p className="font-bold">{shippingDetails.from.address}</p>
            </div>

            <div className="text-xs">
              <p>
                {shippingDetails.from.province} - {shippingDetails.from.city} -{" "}
                {shippingDetails.from.postal_code}
              </p>
            </div>
          </div>
          <div className="relative mt-2 rounded-lg border-[0.5px] border-prim-light p-3 dark:border-prim-dark">
            <p className="absolute -top-2 bg-prim-libg px-1 text-xs text-prim-light dark:bg-prim-dkbg dark:text-prim-dark">
              Detail Address
            </p>
            <p>{shippingDetails.from.detail_address}</p>
          </div>
        </div>
        {/*To*/}
        {shippingDetails.cancel ? (
          <div className="relative h-10 border-r-2 border-dotted border-red-500 text-xs text-red-500 tablet:h-0 tablet:w-40 tablet:border-r-0 tablet:border-t-2">
            <GiShipWreck className="absolute -left-[0.45rem] top-[30%] h-4 w-4 tablet:left-[40%] tablet:top-1" />
            <p className="absolute left-3 top-[30%] tablet:top-5">Canceled</p>
          </div>
        ) : (
          <div className="text-xs tablet:flex tablet:items-center">
            {shippingDetails.paid ? (
              <div className="relative h-10 border-r-2 border-dotted border-yellow-500 text-yellow-500 tablet:h-0 tablet:w-20 tablet:border-r-0 tablet:border-t-2">
                <FaHourglassHalf className="absolute -left-[0.45rem] top-[30%] h-4 w-4 tablet:left-[40%] tablet:top-1 " />
                <p className="absolute left-3 top-[30%] tablet:top-5">
                  Processing
                </p>
              </div>
            ) : (
              <div className="relative h-10 border-r-2 border-dotted border-yellow-500 text-yellow-500 tablet:h-0 tablet:w-32 tablet:border-r-0 tablet:border-t-2">
                <FaHandHoldingDollar className="absolute -left-[0.45rem] top-[30%] h-4 w-4 tablet:left-[40%] tablet:top-1" />
                <p className="absolute left-3 top-[30%] w-40 tablet:left-2 tablet:top-5">
                  Waiting For Payment
                </p>
              </div>
            )}
            {shippingDetails.shipped && shippingDetails.paid && (
              <div className="relative mt-[1px] h-10 border-r-2 border-dotted border-cyan-500 text-cyan-500 tablet:ml-[1px] tablet:mt-0 tablet:h-0 tablet:w-20 tablet:border-r-0 tablet:border-t-2">
                <FaShip className="absolute -left-[0.45rem] top-[30%] h-4 w-4 tablet:-top-5 tablet:left-[40%]" />
                <p className="absolute right-3 top-[30%] tablet:-top-10 tablet:right-5">
                  Shipped
                </p>
              </div>
            )}
            {shippingDetails.delivered && (
              <div className="relative mt-[1px] h-10 border-r-2 border-dotted border-green-500 text-green-500 tablet:ml-[1px] tablet:mt-0 tablet:h-0 tablet:w-20 tablet:border-r-0 tablet:border-t-2">
                <BsFillBoxSeamFill className="absolute -left-[0.45rem] top-[30%] h-4 w-4 tablet:left-[40%] tablet:top-1" />
                <p className="tablet absolute left-3 top-[30%] tablet:left-4 tablet:top-5">
                  Delivered
                </p>
              </div>
            )}
          </div>
        )}
        <div className="w-full rounded-lg border-[0.5px] border-border-light p-3 shadow-md dark:border-border-dark dark:shadow dark:shadow-white/10">
          <div className="items-center gap-2">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-500" />
              <p className="font-bold">{shippingDetails.to.address}</p>
            </div>
            <div className="text-xs">
              <p>
                {shippingDetails.to.province} - {shippingDetails.to.city} -{" "}
                {shippingDetails.to.postal_code}
              </p>
            </div>
          </div>
          <div className="relative mt-2 rounded-lg border-[0.5px] border-prim-light p-3 dark:border-prim-dark">
            <p className="absolute -top-2 bg-prim-libg px-1 text-xs text-prim-light dark:bg-prim-dkbg dark:text-prim-dark">
              Detail Address
            </p>
            <p>{shippingDetails.to.detail_address}</p>
          </div>
        </div>
      </div>
      {/*Shipping properties*/}
      <div className="mt-5 flex w-full flex-col items-center gap-5 tablet:flex-row tablet:justify-center">
        {/*Properties*/}
        <div className="w-full flex-1 rounded-lg border-[0.5px] border-border-light p-3 shadow-md dark:border-border-dark dark:shadow dark:shadow-white/10 tablet:max-w-[30vw]">
          <div className="border-b-2 border-border-light pb-2 dark:border-border-dark">
            <p className="font-bold">{shippingDetails.name}</p>
            <div className="text-xs capitalize">
              <p className="">
                {shippingDetails.item_props.category}{" "}
                {shippingDetails.item_props.others &&
                  `- ${shippingDetails.item_props.others}`}
                {` (${shippingDetails.etd} Days)`}
              </p>
            </div>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-1 text-xs">
            <div>
              <p>Length: {shippingDetails.item_props.length}cm</p>
            </div>
            <div>
              <p>Width: {shippingDetails.item_props.width}cm</p>
            </div>
            <div>
              <p>Height: {shippingDetails.item_props.height}cm</p>
            </div>
            <div>
              <p>Weight: {shippingDetails.item_props.weight / 1000}kg</p>
            </div>
          </div>
          <div className="relative mt-5 rounded-lg border-[0.5px] border-prim-light p-3 dark:border-prim-dark">
            <p className="absolute -top-2 bg-prim-libg px-1 text-xs text-prim-light dark:bg-prim-dkbg dark:text-prim-dark">
              Description
            </p>
            <p>{shippingDetails.item_props.description}</p>
          </div>
          <div className="relative mt-5  rounded-lg border-[0.5px] border-prim-light p-3 dark:border-prim-dark">
            <p className="absolute -top-2 bg-prim-libg px-1 text-xs text-prim-light dark:bg-prim-dkbg dark:text-prim-dark">
              Total Payment
            </p>
            <div className="flex flex-col justify-center gap-3 text-xs mobile:flex-row">
              {shippingDetails.item_props.gogreen ||
              shippingDetails.item_props.insurance ||
              shippingDetails.item_props.donation ? (
                <div className="relative mt-2 flex-1 rounded-lg border-[0.5px] border-prim-light p-2 dark:border-prim-dark">
                  <p className="absolute -top-2 bg-prim-libg px-1 text-xs text-prim-light dark:bg-prim-dkbg dark:text-prim-dark">
                    Add-ons
                  </p>
                  {shippingDetails.item_props.gogreen && (
                    <p>GoGreen: Rp {currencyFormat.format(1000)}</p>
                  )}
                  {shippingDetails.item_props.insurance && (
                    <p>Insurance: Rp {currencyFormat.format(9000)}</p>
                  )}
                  {shippingDetails.item_props.donation && (
                    <p>Donation: Rp {currencyFormat.format(5000)}</p>
                  )}
                </div>
              ) : (
                <div className="relative mt-2  flex-1 rounded-lg border-[0.5px] border-prim-light p-2 dark:border-prim-dark">
                  <p className="absolute -top-2 bg-prim-libg px-1 text-xs text-prim-light dark:bg-prim-dkbg dark:text-prim-dark">
                    Add-ons
                  </p>
                  <p>No Add-ons</p>
                </div>
              )}
              <div className="relative mt-2 flex-1 rounded-lg border-[0.5px] border-prim-light p-2 dark:border-prim-dark">
                <p className="absolute -top-2 bg-prim-libg px-1 text-xs text-prim-light dark:bg-prim-dkbg dark:text-prim-dark">
                  Package
                </p>
                <p>Courier: {shippingDetails.courier}</p>
                <p>Service: {shippingDetails.service}</p>
                <p>Cost: Rp {currencyFormat.format(shippingDetails.cost)}</p>
              </div>
            </div>
            <div className="relative mt-5 rounded-lg border-[0.5px] border-prim-light p-2 text-xs dark:border-prim-dark">
              <p className="absolute -top-2 bg-prim-libg px-1 text-xs text-prim-light dark:bg-prim-dkbg dark:text-prim-dark">
                Total Cost
              </p>
              <p className="text-center">
                {currencyFormat.format(shippingDetails.cost)}{" "}
                {`${
                  shippingDetails.item_props.gogreen
                    ? ` + ${currencyFormat.format(1000)}`
                    : ""
                }`}
                {`${
                  shippingDetails.item_props.insurance
                    ? ` + ${currencyFormat.format(9000)}`
                    : ""
                }`}
                {`${
                  shippingDetails.item_props.donation
                    ? ` + ${currencyFormat.format(5000)}`
                    : ""
                }`}{" "}
              </p>
              <p className="text-center font-bold">Total Payment</p>
              <p className="text-center">
                Rp {currencyFormat.format(shippingDetails.totalCost)}
              </p>
            </div>
          </div>
          <div className="relative mt-5 flex w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border-[0.5px] border-border-light p-3 text-xs shadow-md dark:border-border-dark dark:shadow dark:shadow-white/10">
            <ShippingStatus
              delivered={shippingDetails.delivered}
              paid={shippingDetails.paid}
              shipped={shippingDetails.shipped}
              cancel={shippingDetails.cancel}
            />
          </div>
        </div>
        {paymentDetail ? (
          <div className="flex h-full w-full flex-1 gap-2 self-start rounded-lg p-3 shadow-md">
            <div className="relative w-[70%] rounded-lg border-[0.5px] border-prim-light p-2 text-xs dark:border-prim-dark">
              <p className="absolute -top-2 bg-prim-libg px-1 text-xs text-prim-light dark:bg-prim-dkbg dark:text-prim-dark">
                Payment Detail
              </p>
              <p className="mb-2 border-b-[1px] text-center text-lg font-bold text-prim-light">
                PAID
              </p>
              <div className="flex justify-between px-1">
                <div className="space-y-1">
                  <p>Base Cost</p>
                  <p>Discount</p>
                  {paymentDetail.promo_name && <p>Promo Name</p>}
                  <p>Max Discount</p>
                  <p>Get Discount</p>
                  <p className="font-bold text-prim-light dark:text-prim-dark">
                    Final Cost
                  </p>
                </div>
                <div className="space-y-1 text-right">
                  <p
                    className={`${
                      paymentDetail.discount &&
                      " line-through decoration-red-500"
                    }`}
                  >
                    Rp {currencyFormat.format(paymentDetail.base_cost)}
                  </p>
                  <p>{paymentDetail.discount}%</p>
                  {paymentDetail.promo_name && (
                    <p>{paymentDetail.promo_name}</p>
                  )}
                  <p>
                    Rp{" "}
                    {currencyFormat.format(
                      paymentDetail.max_discount as number,
                    )}
                  </p>
                  <p>
                    Rp{" "}
                    {currencyFormat.format(
                      calculateDiscount(
                        paymentDetail.base_cost,
                        paymentDetail.discount as number,
                        paymentDetail.max_discount as number,
                      ),
                    )}
                  </p>
                  <p className="font-bold text-prim-light dark:text-prim-dark">
                    Rp {currencyFormat.format(paymentDetail.final_cost)}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-1 flex-col justify-evenly">
              <UpdateButton
                type="button"
                icon={<GiShipWreck className="h-full w-full" />}
                wmax
                cancel
                name="update-status"
                disabled={
                  shippingDetails.cancel ||
                  shippingDetails.shipped ||
                  shippingDetails.delivered
                }
                onClick={() => handleOnChangeStatus(true, false, false)}
              >
                Canceled
              </UpdateButton>
              <UpdateButton
                type="button"
                icon={<FaShip className="h-full w-full" />}
                wmax
                ship
                name="update-status"
                disabled={shippingDetails.shipped || shippingDetails.cancel}
                onClick={() => handleOnChangeStatus(false, true, false)}
              >
                Shipped
              </UpdateButton>
              <UpdateButton
                type="button"
                icon={<BsFillBoxSeamFill className="h-full w-full" />}
                wmax
                deliver
                name="update-status"
                disabled={shippingDetails.delivered || shippingDetails.cancel}
                onClick={() => handleOnChangeStatus(false, false, true)}
              >
                Delivered
              </UpdateButton>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default AdminShippingDetails;
