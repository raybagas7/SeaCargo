import { useShipping } from "@/store/shipping/useShipping";
import React, { useEffect, useState } from "react";
import Input from "../Input/Input";
import SelectProvince from "../SelectAddress/SelectProvince/SelectProvince";
import SelectCity from "../SelectAddress/SelectCity/SelectCity";
import SelectPostal from "../SelectAddress/SelectPostal/SelectPostal";
import TextArea from "../TextArea/TextArea";
import Button from "../Button/Button";
import { IAddressInput } from "@/interface/addresses";
import { useRajaOngkir } from "@/store/rajaongkir/useRajaongkir";
import WheeleSpin from "../WheeleSpin/WheeleSpin";
import { getCookie } from "cookies-next";
import { useUser } from "@/store/user/useUser";
import { useModal } from "@/store/modal/useModal";

interface IEditAddress {
  triggerUseEffect: () => void;
}

function EditAddress({ triggerUseEffect }: IEditAddress) {
  const selectedAddress = useShipping.use.selectedAddress();
  const { getProvinceEdit, getCitiesEdit } = useRajaOngkir.getState();
  const { editAddress } = useUser.getState();
  const { hideModal } = useModal.getState();
  const citiesEdit = useRajaOngkir.use.citiesEdit();
  const provincesEdit = useRajaOngkir.use.provincesEdit();
  const [addressData, setAddressData] = useState<IAddressInput>({
    provCode: selectedAddress ? selectedAddress.province_id : "1",
    province: selectedAddress ? selectedAddress.province : "Bali",
    cityCode: selectedAddress ? selectedAddress.city_id : "17",
    city: selectedAddress ? selectedAddress.city : "Badung",
    postalCode: selectedAddress ? selectedAddress.postal_code : "80351",
    address: selectedAddress ? selectedAddress.address : "",
    detailAddress: selectedAddress ? selectedAddress.detail_address : "",
  });

  useEffect(() => {
    if (!provincesEdit) {
      getProvinceEdit();
    }
    getCitiesEdit(addressData.provCode);
  }, [addressData.provCode]);

  if (!citiesEdit || !provincesEdit) {
    return (
      <div className="flex-1">
        <WheeleSpin />
      </div>
    );
  }

  const getNameAddress = (id: string, key: string) => {
    if (key === "province") {
      const name = provincesEdit?.filter(
        (province) => province.province_id === id,
      );

      if (name) {
        return name[0].province;
      }
      return "";
    }
    if (key === "city") {
      const name = citiesEdit?.filter((city) => city.city_id === id);

      if (name) {
        return name[0].city_name;
      }
      return "";
    }
  };

  const onChageAddressData = (
    event: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >,
    key: string,
    secKey?: string,
  ) => {
    if (secKey) {
      setAddressData({
        ...addressData,
        [key]: event.target.value,
        [secKey]: getNameAddress(event.target.value, secKey),
      });
    } else {
      setAddressData({
        ...addressData,
        [key]: event.target.value,
      });
    }
  };

  const handleSubmitEditAddress = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = getCookie("accessToken");
    editAddress(token as string, addressData, selectedAddress?.id as string);
    hideModal();
    triggerUseEffect();
  };

  return (
    <form
      onSubmit={(e) => handleSubmitEditAddress(e)}
      className="space-y-3 rounded-lg border-[0.5px] border-border-light bg-prim-libg p-5 shadow-md"
    >
      <Input
        label="Address"
        value={addressData.address}
        onChange={(e) => onChageAddressData(e, "address")}
        name="address"
        normal
        wmax
      />
      <SelectProvince
        value={addressData.provCode}
        name="provinces"
        data={provincesEdit}
        label="Province"
        onChange={(e) => onChageAddressData(e, "provCode", "province")}
        labelOnTop
      />

      <SelectCity
        value={addressData.cityCode}
        name="cities"
        data={citiesEdit}
        label="City"
        onChange={(e) => onChageAddressData(e, "cityCode", "city")}
        labelOnTop
      />

      <SelectPostal
        value={addressData.postalCode}
        name="postalCode"
        data={citiesEdit}
        label="Postal Code"
        onChange={(e) => onChageAddressData(e, "postalCode")}
        labelOnTop
      />

      <TextArea
        name="detail-add-address"
        label="Detail Address"
        value={addressData.detailAddress}
        onChange={(e) => onChageAddressData(e, "detailAddress")}
      ></TextArea>

      <Button name="submit-address" type="submit" wmax primary normal>
        Edit Address
      </Button>
    </form>
  );
}

export default EditAddress;
