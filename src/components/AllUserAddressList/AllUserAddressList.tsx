import React from "react";
import { GiShipWheel } from "react-icons/gi";
import styles from "./AllUserAddressList.module.scss";
import { useAdminAddresses } from "@/store/adminAddresses/useAdminAddresses";
import Image from "next/image";
import { formatDate } from "@/utils/formatDate";

function AllUserAddressList() {
  const allUserAddresses = useAdminAddresses.use.allUserAddresses();

  if (!allUserAddresses) {
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
            <th className={`${styles.clamp} w-[15%] p-2`}>Owner</th>
            <th className={`${styles.clamp} w-[14%] p-2`}>Address Name</th>
            <th className={`${styles.clamp} w-[13%] p-2`}>Province</th>
            <th className={`${styles.clamp} w-[13%] p-2`}>City</th>
            <th className={`${styles.clamp} w-[25%] p-2`}>Detail</th>
            <th className={`${styles.clamp} w-[10%] p-2`}>Created</th>
            <th className={`${styles.clamp} w-[10%] p-2`}>Updated</th>
          </tr>
        </thead>
        <tbody className=" text-sec-litext">
          {allUserAddresses?.map((address) => (
            // shipping.
            <tr
              key={address.id}
              className=" cursor-pointer border-b-[1px] border-border-light hover:bg-prim-light/10 "
            >
              <td className={`p-2`}>
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10">
                    <Image
                      className="h-10 w-10 rounded-full object-cover"
                      alt="owner-img"
                      src={address.photo}
                      height={100}
                      width={100}
                      loading="lazy"
                    />
                  </div>
                  <div className={`${styles.clamp} flex-1`}>
                    <p className={`${styles.clamp}`}>{address.owner}</p>
                    <p className={`${styles.clamp}`}>{address.email}</p>
                  </div>
                </div>
              </td>
              <td className="p-2">
                <p className={`${styles.clamp}`}>{address.address}</p>
              </td>
              <td className="p-2">
                <p className={`${styles.clamp}`}>{address.province}</p>
              </td>
              <td className="p-2">
                <p className={`${styles.clamp}`}>{address.city}</p>
              </td>
              <td className="p-2">
                <p className={`${styles.clamp}`}>{address.detail_address}</p>
              </td>
              <td className="p-2">
                <p className={`${styles.clamp}`}>
                  {formatDate(address.createdAt)}
                </p>
              </td>
              <td className="p-2">
                <p className={`${styles.clamp}`}>
                  {formatDate(address.updatedAt)}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllUserAddressList;
