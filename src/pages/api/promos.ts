import { IResponseApi } from "@/interface/users";
import service from "@/service/service";
import type { NextApiRequest, NextApiResponse } from "next";
import { decodeJWT } from "@/utils/jwtDecode";
import ShortUniqueId from "short-unique-id";
import { IPromos } from "@/interface/promos";
import { convertDateToMilis } from "@/utils/convertDateToMilis";

type Data = {
  name?: string;
  message?: string;
  error?: string;
  data?: string;
  user?: object;
  wallet?: object;
  promo?: object;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === "POST") {
    const postPromo = async () => {
      const token = req.headers.authorization;
      const uid6 = new ShortUniqueId({ length: 6 });
      const topupId = `promo-${uid6.rnd()}`;
      const { promo_data } = req.body;

      const decoded = token ? decodeJWT(token) : null;
      if (decoded === null) {
        res.status(408).json({ error: "Token timeout" });
      }
      const date = new Date();
      const newDate = new Date(date.setMonth(date.getMonth() + 1));

      const promoPayload: IPromos = {
        ...promo_data,
        value: parseInt(promo_data.value),
        max: parseInt(promo_data.max),
        count: parseInt(promo_data.count),
        id: topupId,
        expired: convertDateToMilis(String(newDate)),
      };

      const { error, data, message, code }: IResponseApi<any> =
        await service.postPromo(token as string, promoPayload);

      if (error && code === 401) {
        res.status(code).json({ error: message });
      } else if (error) {
        res.status(400).json({ error: message });
      } else {
        return data;
      }
    };
    try {
      const promo = await postPromo();
      res.status(201).json(promo);
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  } else if (req.method === "GET") {
    const promosData = async () => {
      const token = req.headers.authorization;

      const decoded = token ? decodeJWT(token) : null;

      if (decoded === null) {
        res.status(408).json({ error: "Token timeout" });
      }
      const { error, data, message, code }: IResponseApi<any> =
        await service.getPromos(token as string);

      if (error && code === 401) {
        res.status(code).json({ error: message });
      } else if (error) {
        res.status(400).json({ error: message });
      } else {
        return data;
      }
    };

    try {
      const promos = await promosData();
      const validPromo = promos.filter((promo: any) => promo.count > 0);
      res.status(201).json(validPromo);
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
