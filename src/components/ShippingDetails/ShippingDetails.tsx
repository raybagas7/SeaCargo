import React, { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { useShipping } from "@/store/shipping/useShipping";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { FaFlag, FaMapMarkerAlt, FaWallet } from "react-icons/fa";
import { FaHourglassHalf, FaShip } from "react-icons/fa";
import { GiShipWreck } from "react-icons/gi";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { currencyFormat } from "@/utils/currencyFormat";
import { useUser } from "@/store/user/useUser";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { useModal } from "@/store/modal/useModal";
import { formatDate } from "@/utils/formatDate";
import { BiSolidDiscount } from "react-icons/bi";
import { calculateDiscount } from "@/utils/calculateDiscount";
import { calculateFinalCost } from "@/utils/calculateFinalCost";
import ShippingStatus from "../ShippingStatus/ShippingStatus";

export interface IShippingDetails {
  shippingId: string;
}

function ShippingDetails({ shippingId }: IShippingDetails) {
  const shippingDetails = useShipping.use.shippingDetails();
  const appliedReferal = useShipping.use.appliedReferal();
  const wallet = useUser.use.walletData();
  const selectedPromo = useShipping.use.selectedPromo();
  const [referal, setReferal] = useState<string>("");
  const token = getCookie("accessToken");

  const onChangeReferal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReferal(e.target.value);
  };

  const { getShippingDetails, resetPromo, checkReferal, payShipping } =
    useShipping.getState();
  const { showModal2 } = useModal.getState();
  const { getWalletData } = useUser.getState();
  useEffect(() => {
    getShippingDetails(token as string, shippingId);
    getWalletData(token as string);
  }, [shippingId]);

  if (!shippingDetails) {
    return <LoadingSpinner />;
  }

  const countDiscount = (
    totalCost: number,
    discount: number,
    maxDisc: number,
  ) => {
    const dicount = (discount / 100) * totalCost;
    if (dicount > maxDisc) {
      return maxDisc;
    }
    return dicount;
  };

  const handleCheckReferal = () => {
    checkReferal(token as string, referal);
  };

  const handlePayment = () => {
    payShipping(
      token as string,
      shippingDetails.totalCost,
      shippingDetails.id,
      shippingDetails.name,
      selectedPromo?.id,
      referal ? referal : undefined,
    );
  };

  return (
    <div
      className="max-h-[90vh] w-[85vw] overflow-y-scroll scroll-smooth rounded-xl px-[1.5rem] py-[2.5rem] text-prim-litext dark:bg-prim-dkbg dark:text-prim-dktext tablet:w-[60vw]"
      id="payment-detail"
    >
      <h2 className="mb-5 text-center text-xl font-bold text-prim-light dark:text-prim-dark">
        Payment
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
        <div className="w-full rounded-lg border-[0.5px] border-border-light p-3 shadow-md dark:border-border-dark dark:shadow dark:shadow-white/10 tablet:max-w-[30vw]">
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
          {shippingDetails.paid || shippingDetails.cancel ? (
            <div className="relative mt-5 flex w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border-[0.5px] border-border-light p-3 text-xs shadow-md dark:border-border-dark dark:shadow dark:shadow-white/10">
              <ShippingStatus
                delivered={shippingDetails.delivered}
                paid={shippingDetails.paid}
                shipped={shippingDetails.shipped}
                cancel={shippingDetails.cancel}
              />
            </div>
          ) : (
            // Total Payment
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
              <div className="relative mt-5 flex-1 rounded-lg border-[0.5px] border-prim-light p-2 dark:border-prim-dark">
                <p className="absolute -top-2 bg-prim-libg px-1 text-xs text-prim-light dark:bg-prim-dkbg dark:text-prim-dark">
                  Promos
                </p>
                <div className="flex flex-col items-center justify-center text-xs">
                  <div className="mb-2 w-full">
                    {selectedPromo ? (
                      <div
                        onClick={showModal2}
                        className={`group relative flex cursor-pointer overflow-hidden rounded-lg border-[0.5px] border-sec-light p-3 hover:bg-prim-light/10`}
                      >
                        <div className="w-[50%]">
                          <p className="overflow-hidden text-ellipsis whitespace-nowrap font-bold">
                            {selectedPromo.name}
                          </p>
                          <p className="text-sec-litext dark:text-sec-litext">
                            Until: {formatDate(selectedPromo.expired)}
                          </p>
                        </div>
                        <div className="w-[50%]">
                          <div className="flex items-center gap-1">
                            <BiSolidDiscount className="h-4 w-4" />
                            <p>{selectedPromo.value}%</p>
                          </div>
                          <p>
                            Max: Rp {currencyFormat.format(selectedPromo.max)}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-center">"No promo selected"</p>
                    )}
                  </div>
                  {selectedPromo ? (
                    <p className="mb-2">
                      You get discount: Rp{" "}
                      {currencyFormat.format(
                        calculateDiscount(
                          shippingDetails.totalCost,
                          selectedPromo?.value as number,
                          selectedPromo?.max as number,
                        ),
                      )}
                    </p>
                  ) : null}
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      onClick={showModal2}
                      name="get-promo"
                      small
                      primary
                    >
                      Check Promo
                    </Button>
                    {selectedPromo && (
                      <Button
                        onClick={resetPromo}
                        type="button"
                        name="reset-promo"
                        small
                        primary
                      >
                        Remove Promo
                      </Button>
                    )}
                  </div>
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
                  {selectedPromo
                    ? ` - ${currencyFormat.format(
                        calculateDiscount(
                          shippingDetails.totalCost,
                          selectedPromo?.value as number,
                          selectedPromo?.max as number,
                        ),
                      )}`
                    : ""}
                </p>
                <p className="text-center font-bold">Total Payment</p>
                <p className="text-center font-bold">
                  Rp{" "}
                  {currencyFormat.format(
                    selectedPromo
                      ? calculateFinalCost(
                          shippingDetails.totalCost,
                          selectedPromo?.value as number,
                          selectedPromo?.max as number,
                        )
                      : shippingDetails.totalCost,
                  )}
                </p>
              </div>
            </div>
          )}
        </div>
        {/*Payment*/}
        {shippingDetails.paid || shippingDetails.cancel ? null : (
          <div className="relative mt-5 flex w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border-[0.5px] border-border-light p-3 text-xs shadow-md dark:border-border-dark dark:shadow dark:shadow-white/10">
            <FaHandHoldingDollar className="absolute -bottom-6 -left-3 h-36 w-36 text-yellow-500/30" />
            <div className="z-20 flex w-full items-center justify-between border-b-2 border-border-light pb-2 dark:border-border-dark">
              <div className="flex gap-2">
                <FaWallet className=" text-prim-light" /> Rp{" "}
                {wallet && currencyFormat.format(wallet?.balance)}
              </div>
              <div>
                {appliedReferal ? (
                  <p>Referal Applied: {appliedReferal}</p>
                ) : (
                  "No referal Applied"
                )}
              </div>
            </div>
            <p className="text-center"></p>
            <Input
              value={referal}
              onChange={(e) => onChangeReferal(e)}
              name="referal-paymeny"
              normal
              label="Referal"
            />
            <Button
              type="button"
              name="check-referal"
              small
              primary
              onClick={handleCheckReferal}
            >
              Check
            </Button>

            <div className="z-10 flex w-full justify-center border-t-2 p-2">
              <Button
                onClick={handlePayment}
                type="button"
                name="pay-shipping"
                small
                wmax
                primary
              >
                Pay
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShippingDetails;
