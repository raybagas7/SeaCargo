import { useAdminShipping } from "@/store/adminShipping/useAdminShipping";
import React from "react";
import styles from "./AdminShippingsList.module.scss";
import Image from "next/image";
import { formatDate } from "@/utils/formatDate";
import { currencyFormat } from "@/utils/currencyFormat";
import TableShippingStatus from "../TableShippingStatus/TableShippingStatus";
import { useModal } from "@/store/modal/useModal";
import { getCookie } from "cookies-next";
import { GiShipWheel } from "react-icons/gi";

function AdminShippingsList() {
  const { setSelectedShippingId, getPaymentDetails, resetPaymentDetails } =
    useAdminShipping.getState();
  const { showModal } = useModal.getState();
  const token = getCookie("accessToken");

  const handleOnClickShipping = (shippingId: string, paid: boolean) => {
    resetPaymentDetails();
    if (paid) {
      getPaymentDetails(token as string, shippingId);
    }
    setSelectedShippingId(shippingId);
    showModal();
  };

  const allShippingsData = useAdminShipping.use.allShippingsData();
  if (!allShippingsData) {
    return (
      <div className="h-screen w-full">
        <div className="flex h-full w-full items-center justify-center">
          <GiShipWheel className="h-10 w-10 animate-spin text-prim-light" />
        </div>
      </div>
    );
  }
  return (
    <div className="w-full rounded-lg p-5 shadow-md">
      <table className="w-full table-fixed text-left text-sm">
        <thead>
          <tr className="border-b-[1px] border-border-light">
            <th className={`${styles.clamp} w-[20%] p-2`}>Owner</th>
            <th className={`${styles.clamp} w-[15%] p-2`}>Shipping Name</th>
            <th className={`${styles.clamp} w-[15%] p-2`}>Starting Point</th>
            <th className={`${styles.clamp} w-[15%] p-2`}>Destination</th>
            <th className={`${styles.clamp} w-[10%] p-2`}>Cost</th>
            <th className={`${styles.clamp} w-[15%] p-2`}>Status</th>
            <th className={`${styles.clamp} w-[10%] p-2`}>Date</th>
          </tr>
        </thead>
        <tbody className=" text-sec-litext">
          {allShippingsData?.map((shipping) => (
            // shipping.
            <tr
              onClick={() => handleOnClickShipping(shipping.id, shipping.paid)}
              key={shipping.id}
              className=" cursor-pointer border-b-[1px] border-border-light hover:bg-prim-light/10 "
            >
              <td className={`p-2`}>
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10">
                    <Image
                      className="h-10 w-10 rounded-full object-cover"
                      alt="owner-img"
                      src={shipping.photo}
                      height={100}
                      width={100}
                      loading="lazy"
                    />
                  </div>
                  <div className={`${styles.clamp} flex-1`}>
                    <p className={`${styles.clamp}`}>{shipping.owner}</p>
                    <p className={`${styles.clamp}`}>{shipping.email}</p>
                  </div>
                </div>
              </td>
              <td className={`${styles.clamp} p-2`}>{shipping.name}</td>
              <td className="p-2">
                <p className={`${styles.clamp}`}>{shipping.from.city}</p>
                <p className={`${styles.clamp}`}>{shipping.from.province}</p>
              </td>
              <td className="p-2">
                <p className={`${styles.clamp}`}>{shipping.to.city}</p>
                <p className={`${styles.clamp}`}>{shipping.to.province}</p>
              </td>
              <td className={`${styles.clamp} p-2`}>
                Rp {currencyFormat.format(shipping.cost)}
              </td>
              <td className={`${styles.clamp} p-2`}>
                <TableShippingStatus
                  delivered={shipping.delivered}
                  paid={shipping.paid}
                  shipped={shipping.shipped}
                  cancel={shipping.cancel}
                />
              </td>
              <td className={`${styles.clamp} p-2`}>
                {formatDate(shipping.createdAt as number)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminShippingsList;
