import { IResponseApi } from "@/interface/users";
import service from "@/service/service";
import type { NextApiRequest, NextApiResponse } from "next";
import { decodeJWT } from "@/utils/jwtDecode";
import ShortUniqueId from "short-unique-id";
import { IAddress } from "@/interface/addresses";
import { convertDateToMilis } from "@/utils/convertDateToMilis";

type Data = {
  name?: string;
  message?: string;
  error?: string;
  data?: string;
  user?: object;
  wallet?: object;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === "POST") {
    const postNewAddress = async () => {
      const token = req.headers.authorization;
      const uid6 = new ShortUniqueId({ length: 6 });
      const addressId = `address-${uid6.rnd()}`;
      const {
        address,
        province,
        city,
        postal_code,
        province_id,
        city_id,
        detail_address,
      } = req.body;
      const decoded = token ? decodeJWT(token) : null;

      if (decoded === null) {
        res.status(408).json({ error: "Token timeout" });
      }
      const userId = decoded ? decoded.sub : null;
      const date = new Date();
      const newAddressPayload: IAddress = {
        id: addressId,
        owner: userId,
        address: address,
        province: province,
        province_id: province_id,
        city: city,
        city_id: city_id,
        postal_code: postal_code,
        detail_address: detail_address,
        createdAt: convertDateToMilis(String(date)),
        updatedAt: convertDateToMilis(String(date)),
      };
      const { error, data, message, code }: IResponseApi<any> =
        await service.postNewAddress(token as string, newAddressPayload);

      if (error && code === 401) {
        res.status(code).json({ error: message });
      } else if (error) {
        res.status(400).json({ error: message });
      } else {
        return data;
      }
    };

    try {
      const address = await postNewAddress();

      res.status(201).json(address);
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  } else if (req.method === "GET") {
    const addressesData = async () => {
      const token = req.headers.authorization;

      const decoded = token ? decodeJWT(token) : null;

      if (decoded === null) {
        res.status(408).json({ error: "Token timeout" });
      }
      const userId = decoded ? decoded.sub : null;

      const { error, data, message, code }: IResponseApi<any> =
        await service.getUserAddresses(token as string, userId);

      if (error && code === 401) {
        res.status(code).json({ error: message });
      } else if (error) {
        res.status(400).json({ error: message });
      } else {
        return data;
      }
    };

    try {
      const addresses = await addressesData();

      res.status(201).json(addresses);
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  } else if (req.method === "PATCH") {
    const postNewAddress = async () => {
      const token = req.headers.authorization;
      const decoded = token ? decodeJWT(token) : null;

      if (decoded === null) {
        res.status(408).json({ error: "Token timeout" });
      }
      const {
        address_id,
        address,
        province,
        city,
        postal_code,
        province_id,
        city_id,
        detail_address,
      } = req.body;

      const date = new Date();
      const editedAddressPayload: any = {
        address: address,
        province: province,
        province_id: province_id,
        city: city,
        city_id: city_id,
        postal_code: postal_code,
        detail_address: detail_address,
        updatedAt: convertDateToMilis(String(date)),
      };
      const { error, data, message, code }: IResponseApi<any> =
        await service.patchAddress(
          token as string,
          editedAddressPayload,
          address_id,
        );

      if (error && code === 401) {
        res.status(code).json({ error: message });
      } else if (error) {
        res.status(400).json({ error: message });
      } else {
        return data;
      }
    };

    try {
      const address = await postNewAddress();

      res.status(201).json(address);
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
