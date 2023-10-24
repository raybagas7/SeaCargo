import { IAddress } from "@/interface/addresses";
import { useModal } from "@/store/modal/useModal";
import { useShipping } from "@/store/shipping/useShipping";
import { useUser } from "@/store/user/useUser";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import { FaAnchorCircleCheck } from "react-icons/fa6";

interface IAddressesUser {
  trigger: boolean;
}

function AddressesUser({ trigger }: IAddressesUser) {
  const userAddresses = useShipping.use.userAddresses();
  const selectedAddress = useShipping.use.selectedAddress();
  const { getUserAddresses } = useShipping.getState();
  const { userData } = useUser.getState();
  const { changeSelectedAddress } = useShipping.getState();
  const { showModal } = useModal.getState();
  const token = getCookie("accessToken");

  const handleChangeAddress = (address: IAddress) => {
    changeSelectedAddress(address);
    showModal();
  };

  useEffect(() => {
    getUserAddresses(token as string);
  }, [trigger]);

  return (
    <div className="mt-5 w-full space-y-3 rounded-lg border-[0.5px] border-border-light p-5 shadow-md tablet:mt-0 tablet:flex-1">
      <h2 className="text-center text-xl font-bold text-prim-light dark:bg-prim-dark">
        Your Address
      </h2>
      {userAddresses?.map((address) => (
        <div
          key={address.id}
          onClick={() => handleChangeAddress(address)}
          className={`group relative cursor-pointer overflow-hidden rounded-lg border-[0.5px] border-sec-light p-3 hover:bg-prim-light/10`}
        >
          <FaAnchorCircleCheck className="absolute right-0 top-5 h-full w-auto translate-y-full text-prim-light/20 transition-transform duration-300 group-hover:translate-y-0 group-hover:transition-transform group-hover:duration-300" />
          <h3 className="t font-bold">{address.address}</h3>
          <p className="text-xs">
            {address.province} - {address.city} - {address.postal_code}
          </p>
          <p>{address.detail_address}</p>
          <p></p>
          <p className="text-xs">Phone number: {userData?.phone}</p>
        </div>
      ))}
    </div>
  );
}

export default AddressesUser;
