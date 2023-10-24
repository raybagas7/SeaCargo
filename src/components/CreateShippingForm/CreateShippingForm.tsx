import { IAddress, IAddressInput } from "@/interface/addresses";
import React, { useState } from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useUser } from "@/store/user/useUser";
import Modal from "../Modal/Modal";
import { useModal } from "@/store/modal/useModal";
import AddressesList from "../AddressesList/AddressesList";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { FaArrowAltCircleDown } from "react-icons/fa";
import Input from "../Input/Input";
import { IItemProperties, INewShippingData } from "@/interface/shippings";
import SelectShippingAddress from "../SelectShippingAddress/SelectShippingAddress";
import CheckBox from "../CheckBox/CheckBox";
import UniSelect from "../UniSelect/UniSelect";
import { currencyFormat } from "@/utils/currencyFormat";
import Button from "../Button/Button";
import { getCookie } from "cookies-next";
import { useShipping } from "@/store/shipping/useShipping";

interface ICreateShippingForm {
  userAddresses: IAddress[] | undefined;
  selectedAddress: IAddress | undefined;
}

function CreateShippingForm({
  userAddresses,
  selectedAddress,
}: ICreateShippingForm) {
  const { userData } = useUser.getState();
  const { showModal } = useModal.getState();
  const { postShipping } = useShipping.getState();
  const [itemProps, setItemProps] = useState<IItemProperties>({
    name: "",
    length: 0,
    width: 0,
    height: 0,
    weight: 0,
    category: "electronic",
    description: "",
    others: "",
    insurance: false,
    gogreen: false,
    donation: false,
  });

  const [addressData, setAddressData] = useState<IAddressInput>({
    provCode: "1",
    province: "Bali",
    cityCode: "17",
    city: "Badung",
    postalCode: "80351",
    address: "",
    detailAddress: "",
  });

  const onItemPropChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    key: string,
  ) => {
    if (key === "category" && e.target.value !== "others") {
      setItemProps({ ...itemProps, [key]: e.target.value, others: "" });
    } else {
      setItemProps({ ...itemProps, [key]: e.target.value });
    }
  };

  const onItemPropClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    key: string,
  ) => {
    if (key === "insurance" || key === "gogreen" || key === "donation") {
      setItemProps({ ...itemProps, [key]: !itemProps[key] });
    }
  };

  if (!userAddresses) {
    return <LoadingSpinner />;
  }

  const shippingPayload: INewShippingData = {
    name: itemProps.name,
    from: {
      province_id: selectedAddress!.province_id,
      province: selectedAddress!.province,
      city_id: selectedAddress!.city_id,
      city: selectedAddress!.city,
      postal_code: selectedAddress!.postal_code,
      address: selectedAddress!.address,
      detail_address: selectedAddress!.detail_address,
    },
    to: {
      province_id: addressData.provCode,
      province: addressData.province,
      city_id: addressData.cityCode,
      city: addressData.city,
      postal_code: addressData.postalCode,
      address: addressData.address,
      detail_address: addressData.detailAddress,
    },
    item_props: itemProps,
  };

  const handleSubmitShipping = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = getCookie("accessToken");
    postShipping(token as string, shippingPayload);
  };

  return (
    <>
      <Modal
        component={
          <AddressesList
            userAddresses={userAddresses}
            selectedAddress={selectedAddress}
          />
        }
      />
      <div className="px-10">
        <form onSubmit={handleSubmitShipping} className="space-y-5">
          {/*Select Address Input*/}
          <div className="text-prim-litex w-full rounded-lg border-[0.5px] border-border-light bg-prim-libg p-5 shadow-md">
            <h2 className="mb-5 text-center">Selected Address</h2>
            <div
              onClick={showModal}
              className="cursor-pointer rounded-lg border-[0.5px] border-sec-light p-3 hover:bg-prim-light/10"
            >
              <h3 className="t font-bold">{selectedAddress?.address}</h3>
              <p className="text-xs">
                {selectedAddress?.province} - {selectedAddress?.city} -{" "}
                {selectedAddress?.postal_code}
              </p>
              <p>{selectedAddress?.detail_address}</p>
              <p></p>
              <p className="text-xs">Phone number: {userData?.phone}</p>
            </div>
          </div>
          {/*Select Item Properties Input*/}
          <div className="text-prim-litex w-full rounded-lg border-[0.5px] border-border-light bg-prim-libg p-10 shadow-md">
            <h2 className="mb-5 text-center">Item Properties</h2>
            <div className="flex w-full flex-col items-center gap-3">
              <BsFillBoxSeamFill className="h-20 w-20 text-prim-light" />
              <div className="w-full flex-1 space-y-3">
                <Input
                  value={itemProps.name}
                  onChange={(e) => onItemPropChange(e, "name")}
                  name="name-shipping"
                  label="Shipping Name"
                  normal
                  wmax
                  type="text"
                  required
                />
                <Input
                  value={itemProps.length}
                  onChange={(e) => onItemPropChange(e, "length")}
                  name="length"
                  label="Length"
                  normal
                  wmax
                  type="number"
                  required
                />
                <Input
                  value={itemProps.width}
                  onChange={(e) => onItemPropChange(e, "width")}
                  name="width"
                  label="Width"
                  normal
                  wmax
                  type="number"
                  required
                />
                <Input
                  value={itemProps.height}
                  onChange={(e) => onItemPropChange(e, "height")}
                  name="height"
                  label="Height"
                  normal
                  wmax
                  type="number"
                  required
                />
                <Input
                  value={itemProps.weight}
                  onChange={(e) => onItemPropChange(e, "weight")}
                  name="weight"
                  label="Weight"
                  normal
                  wmax
                  type="number"
                  required
                />
                <Input
                  value={itemProps.description}
                  onChange={(e) => onItemPropChange(e, "description")}
                  name="description"
                  label="Description"
                  normal
                  wmax
                  type="text"
                />
              </div>
              <div className="flex w-full gap-5">
                <div className="flex-1">
                  <UniSelect
                    name="shipping-category"
                    data={[
                      { value: "electronic", option: "Electronic" },
                      { value: "food", option: "Food" },
                      { value: "document", option: "Document" },
                      { value: "fragile", option: "Fragile" },
                      { value: "others", option: "Others" },
                    ]}
                    value={itemProps.category}
                    onChange={(e) => onItemPropChange(e, "category")}
                    label="Category"
                    labelOnTop
                    wFull
                  />
                </div>
                <div className="flex-1">
                  <Input
                    value={itemProps.others}
                    onChange={(e) => onItemPropChange(e, "others")}
                    name="others"
                    label="Others"
                    normal
                    wmax
                    disabled={itemProps.category !== "others"}
                    type="text"
                    required
                  />
                </div>
              </div>
              {/* <div className="flex gap-3">
                <CheckBox name="insurance" label="Insurance" />
                <CheckBox name="gogreen" label="GoGreen" />
                <CheckBox name="donation" label="Donation" />
              </div> */}
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  type="button"
                  onClick={(e) => onItemPropClick(e, "insurance")}
                  className={`${
                    itemProps.insurance
                      ? "bg-red-500/70 transition-colors"
                      : "hover:bg-red-500/30 hover:transition-colors"
                  } flex flex-col items-center rounded-full border-[0.5px] border-red-500 p-1 px-5 text-xs shadow transition-colors dark:text-prim-libg`}
                >
                  Insurance <span>Rp. {currencyFormat.format(9000)}</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => onItemPropClick(e, "gogreen")}
                  className={`${
                    itemProps.gogreen
                      ? "bg-green-500/70 transition-colors"
                      : "hover:bg-green-500/30 hover:transition-colors"
                  } flex flex-col items-center rounded-full border-[0.5px] border-green-500 p-1 px-5 text-xs shadow transition-colors dark:text-prim-libg`}
                >
                  GoGreen <span>Rp. {currencyFormat.format(1000)}</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => onItemPropClick(e, "donation")}
                  className={`${
                    itemProps.donation
                      ? "bg-blue-500/70 transition-colors"
                      : "hover:bg-blue-500/30 hover:transition-colors"
                  } flex flex-col items-center rounded-full border-[0.5px] border-blue-500 p-1 px-5 text-xs shadow transition-colors dark:text-prim-libg`}
                >
                  Donation <span>Rp. {currencyFormat.format(5000)}</span>
                </button>
              </div>
            </div>
          </div>
          {/*Select Shipping Address*/}
          <div className="text-prim-litex w-full rounded-lg border-[0.5px] border-border-light bg-prim-libg p-10 shadow-md">
            <SelectShippingAddress
              addressData={addressData}
              setAddressData={setAddressData}
            />
          </div>
          <div className="flex justify-center rounded-lg px-10 py-5 shadow-md">
            <div className="flex flex-1 flex-col items-center justify-center gap-2">
              <p>{selectedAddress?.province}</p>
              <FaArrowAltCircleDown className="h-5 w-5 animate-bounce text-prim-light" />
              <p className=" text-center">{addressData.province}</p>
            </div>
            <div className="flex flex-1 items-center">
              <Button type="submit" name="submit-shipping" primary normal>
                Submit Shipping
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateShippingForm;
