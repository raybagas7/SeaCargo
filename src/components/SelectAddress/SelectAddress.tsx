import SelectCity from "@/components/SelectAddress/SelectCity/SelectCity";
import SelectProvince from "@/components/SelectAddress/SelectProvince/SelectProvince";
import { useRajaOngkir } from "@/store/rajaongkir/useRajaongkir";
import React, { useEffect, useState } from "react";
import SelectPostal from "./SelectPostal/SelectPostal";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { IAddressInput } from "@/interface/addresses";
import { getCookie } from "cookies-next";
import { GiShipWheel } from "react-icons/gi";
import { useUser } from "@/store/user/useUser";
import TextArea from "../TextArea/TextArea";

interface IEditAddress {
  triggerUseEffect: () => void;
}

function SelectAddress({ triggerUseEffect }: IEditAddress) {
  const [addressData, setAddressData] = useState<IAddressInput>({
    provCode: "1",
    province: "Bali",
    cityCode: "17",
    city: "Badung",
    postalCode: "80351",
    address: "",
    detailAddress: "",
  });
  const { getProvince, getCities } = useRajaOngkir.getState();
  const { postAddress } = useUser.getState();
  const cities = useRajaOngkir.use.cities();
  const provinces = useRajaOngkir.use.provinces();
  useEffect(() => {
    if (!provinces) {
      getProvince();
    }
    getCities(addressData.provCode);
  }, [addressData.provCode]);

  useEffect(() => {
    if (cities) {
      setAddressData({
        ...addressData,
        city: cities[0].city_name,
        cityCode: cities[0].city_id,
        postalCode: cities[0].postal_code,
      });
    }
  }, [cities]);

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

  const getNameAddress = (id: string, key: string) => {
    if (key === "province") {
      const name = provinces?.filter((province) => province.province_id === id);

      if (name) {
        return name[0].province;
      }
      return "";
    }
    if (key === "city") {
      const name = cities?.filter((city) => city.city_id === id);

      if (name) {
        return name[0].city_name;
      }
      return "";
    }
  };

  const handleSubmitAddress = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = getCookie("accessToken");
    postAddress(token as string, addressData);
    triggerUseEffect();
  };

  if (!provinces || !cities) {
    return (
      <div className="h-screen w-full tablet:flex-1">
        <div className="flex h-full w-full items-center justify-center">
          <GiShipWheel className="h-10 w-10 animate-spin text-prim-light" />
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => handleSubmitAddress(e)}
      className="space-y-3 rounded-lg border-[0.5px] border-border-light bg-prim-libg p-5 shadow-md tablet:flex-1"
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
        data={provinces}
        label="Province"
        onChange={(e) => onChageAddressData(e, "provCode", "province")}
        labelOnTop
      />

      <SelectCity
        value={addressData.cityCode}
        name="cities"
        data={cities}
        label="City"
        onChange={(e) => onChageAddressData(e, "cityCode", "city")}
        labelOnTop
      />

      <SelectPostal
        value={addressData.postalCode}
        name="postalCode"
        data={cities}
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
        Submit Address
      </Button>
    </form>
  );
}

export default SelectAddress;
