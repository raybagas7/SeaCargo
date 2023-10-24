import { IResponseApi } from "@/interface/users";
import service from "@/service/service";
import type { NextApiRequest, NextApiResponse } from "next";
import { decodeJWT } from "@/utils/jwtDecode";
import ShortUniqueId from "short-unique-id";
import {
  INewAddressPayload,
  INewShippingData,
  IShippingDataPayload,
} from "@/interface/shippings";
import { convertDateToMilis } from "@/utils/convertDateToMilis";
import { IPagination } from "@/interface/allshipping";

type Data = {
  name?: string;
  message?: string;
  error?: string;
  data?: string;
  user?: object;
  wallet?: object;
  shippingList?: IShippingDataPayload[];
  pagination?: IPagination;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === "POST") {
    const getCostRajaOngkir = async () => {
      const { newAddressPayload }: INewAddressPayload = req.body;

      const { error, data, message, code }: IResponseApi<any> =
        await service.getCost(
          newAddressPayload.from.city_id,
          newAddressPayload.to.city_id,
          String(newAddressPayload.item_props.weight),
          "jne",
        );

      console.log(data);

      if (data.costs.length === 0) {
        res
          .status(404)
          .json({ error: "There is no service from JNE between these cities" });
      }
      if (error && code === 401) {
        res.status(code).json({ error: message });
      } else if (error) {
        res.status(400).json({ error: message });
      } else {
        return data;
      }
    };

    const postShipping = async () => {
      const cost = await getCostRajaOngkir();

      const token = req.headers.authorization;
      const uid6 = new ShortUniqueId({ length: 6 });
      const shippingId = `shipping-${uid6.rnd()}`;
      const { newAddressPayload }: INewAddressPayload = req.body;
      const decoded = token ? decodeJWT(token) : null;

      if (decoded === null) {
        res.status(408).json({ error: "Token timeout" });
      }

      const insurace: number = newAddressPayload.item_props.insurance
        ? 9000
        : 0;
      const gogreen: number = newAddressPayload.item_props.gogreen ? 1000 : 0;
      const donation: number = newAddressPayload.item_props.donation ? 5000 : 0;

      const totalCost =
        cost.costs[0].cost[0].value + insurace + gogreen + donation;
      const userId = decoded ? decoded.sub : null;
      const date = new Date();
      const shippingPayload: IShippingDataPayload = {
        id: shippingId,
        userId: userId,
        ...(newAddressPayload as INewShippingData),
        createdAt: convertDateToMilis(String(date)),
        updatedAt: convertDateToMilis(String(date)),
        delivered: false,
        paid: false,
        shipped: false,
        cancel: false,
        courier: cost.code,
        service: cost.costs[0].service,
        etd: cost.costs[0].cost[0].etd,
        cost: cost.costs[0].cost[0].value,
        totalCost: totalCost,
      };
      const { error, data, message, code }: IResponseApi<any> =
        await service.postNewShipping(token as string, shippingPayload);

      if (error && code === 401) {
        res.status(code).json({ error: message });
      } else if (error) {
        res.status(400).json({ error: message });
      } else {
        return data;
      }
    };

    try {
      const shipping = await postShipping();
      console.log(shipping);

      res.status(201).json(shipping);
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  } else if (req.method === "GET") {
    const { page, limit, sort, order, q } = req.query;
    console.log(page, limit, sort, order, q);

    const countTotalPage = async () => {
      let totalPage = 0;

      const token = req.headers.authorization;

      const decoded = token ? decodeJWT(token) : null;

      if (decoded === null) {
        res.status(408).json({ error: "Token timeout" });
      }
      const userId = decoded ? decoded.sub : null;

      const {
        error,
        data,
        message,
        code,
      }: IResponseApi<IShippingDataPayload[]> =
        await service.getAllUserShippings(token as string, userId);

      if (data) {
        totalPage = Math.ceil(data.length / parseInt(limit as string));
      }

      if (error && code === 401) {
        res.status(code).json({ error: message });
      } else if (error) {
        res.status(400).json({ error: message });
      } else {
        return totalPage;
      }
    };

    const shippingsData = async () => {
      const totalPage = await countTotalPage();

      const token = req.headers.authorization;

      const decoded = token ? decodeJWT(token) : null;

      if (decoded === null) {
        res.status(408).json({ error: "Token timeout" });
      }
      const userId = decoded ? decoded.sub : null;

      const { error, data, message, code }: IResponseApi<any> =
        await service.getUserShippings(
          token as string,
          userId,
          parseInt(page as string),
          parseInt(limit as string),
          sort as string,
          order as string,
          q as string,
        );

      const pagination: IPagination = {
        page: parseInt(page as string),
        size: parseInt(limit as string),
        count: data.length,
        total_page: totalPage as number,
      };

      if (error && code === 401) {
        res.status(code).json({ error: message });
      } else if (error) {
        res.status(400).json({ error: message });
      } else {
        return { allShippings: data, pagination };
      }
    };

    try {
      const { allShippings, pagination }: any = await shippingsData();

      res.status(201).json({
        shippingList: allShippings as IShippingDataPayload[],
        pagination: pagination,
      });
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
