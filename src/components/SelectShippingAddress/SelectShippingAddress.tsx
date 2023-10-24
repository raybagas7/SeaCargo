import SelectCity from "@/components/SelectAddress/SelectCity/SelectCity";
import SelectPostal from "../SelectAddress/SelectPostal/SelectPostal";
import SelectProvince from "@/components/SelectAddress/SelectProvince/SelectProvince";
import { useRajaOngkir } from "@/store/rajaongkir/useRajaongkir";
import React, { useEffect } from "react";
import Input from "../Input/Input";
import { IAddressInput } from "@/interface/addresses";
import { GiShipWheel } from "react-icons/gi";
import TextArea from "../TextArea/TextArea";

interface ISelectAddress {
  addressData: IAddressInput;
  setAddressData: React.Dispatch<React.SetStateAction<IAddressInput>>;
}

function SelectShippingAddress({
  addressData,
  setAddressData,
}: ISelectAddress) {
  const { getProvince, getCities } = useRajaOngkir.getState();
  //   const { postAddress } = useUser.getState();
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

  if (!provinces || !cities) {
    return (
      <div className="h-screen w-full">
        <div className="flex h-full w-full items-center justify-center">
          <GiShipWheel className="h-10 w-10 animate-spin text-prim-light" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-3 rounded-lg bg-prim-libg">
        <Input
          label="Address"
          value={addressData.address}
          onChange={(e) => onChageAddressData(e, "address")}
          name="address"
          normal
          required
          wmax
        />
        <SelectProvince
          value={addressData.provCode}
          name="provinces"
          data={provinces}
          label="Province"
          onChange={(e) => onChageAddressData(e, "provCode", "province")}
          labelOnTop
          required
        />
        {/* <p>{addressData.provCode} provinceId</p>
        <p>{addressData.province} province</p> */}
        <SelectCity
          value={addressData.cityCode}
          name="cities"
          data={cities}
          label="City"
          onChange={(e) => onChageAddressData(e, "cityCode", "city")}
          labelOnTop
          required
        />
        {/* <p>{addressData.cityCode} cityId</p>
        <p>{addressData.city} city</p> */}

        <SelectPostal
          value={addressData.postalCode}
          name="postalCode"
          data={cities}
          label="Postal Code"
          onChange={(e) => onChageAddressData(e, "postalCode")}
          labelOnTop
          required
        />
        <TextArea
          required
          value={addressData.detailAddress}
          name="detail-address"
          label="Detail Address"
          onChange={(e) => onChageAddressData(e, "detailAddress")}
        />
      </div>
    </div>
  );
}

export default SelectShippingAddress;
