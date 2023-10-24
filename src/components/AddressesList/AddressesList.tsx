import { IAddress } from "@/interface/addresses";
import { useModal } from "@/store/modal/useModal";
import { useShipping } from "@/store/shipping/useShipping";
import { useUser } from "@/store/user/useUser";
import React from "react";
import { FaAnchorCircleCheck } from "react-icons/fa6";

interface IAddressesList {
  userAddresses: IAddress[] | undefined;
  selectedAddress: IAddress | undefined;
}

function AddressesList({ userAddresses, selectedAddress }: IAddressesList) {
  const { userData } = useUser.getState();
  const { hideModal } = useModal.getState();
  const { changeSelectedAddress } = useShipping.getState();

  const handleChangeAddress = (address: IAddress) => {
    changeSelectedAddress(address);
    hideModal();
  };

  return (
    <div className=" w-[70vw] space-y-3 p-5">
      {userAddresses?.map((address) => (
        <div
          key={address.id}
          onClick={() => handleChangeAddress(address)}
          className={`${
            address.id === selectedAddress?.id && "bg-prim-light/10"
          } group relative cursor-pointer overflow-hidden rounded-lg border-[0.5px] border-sec-light p-3 hover:bg-prim-light/10`}
        >
          {address.id === selectedAddress?.id ? (
            <FaAnchorCircleCheck className="absolute right-0 top-5 h-full w-auto text-prim-light/20" />
          ) : (
            <FaAnchorCircleCheck className="absolute right-0 top-5 h-full w-auto translate-y-full text-prim-light/20 transition-transform duration-300 group-hover:translate-y-0 group-hover:transition-transform group-hover:duration-300" />
          )}
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

export default AddressesList;
