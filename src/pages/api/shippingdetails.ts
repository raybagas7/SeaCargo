import { IResponseApi } from "@/interface/users";
import service from "@/service/service";
import type { NextApiRequest, NextApiResponse } from "next";
import { decodeJWT } from "@/utils/jwtDecode";

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
  if (req.method === "GET") {
    const { shippingid } = req.query;

    const shippingsData = async () => {
      const token = req.headers.authorization;

      const decoded = token ? decodeJWT(token) : null;
      // console.log(decoded);

      if (decoded === null) {
        res.status(408).json({ error: "Token timeout" });
      }
      const { error, data, message, code }: IResponseApi<any> =
        await service.getShippingDetail(token as string, shippingid as string);

      if (error && code === 401) {
        res.status(code).json({ error: message });
      } else if (error) {
        res.status(400).json({ error: message });
      } else {
        return data;
      }
    };

    try {
      const shipipngs = await shippingsData();

      res.status(201).json(shipipngs);
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
