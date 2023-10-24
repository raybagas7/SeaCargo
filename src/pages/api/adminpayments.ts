import {
  IReferalDataResponse,
  IResponseApi,
  IUserData,
  IUserDataResponse,
} from "@/interface/users";
import service from "@/service/service";
import type { NextApiRequest, NextApiResponse } from "next";
import { decodeJWT } from "@/utils/jwtDecode";
import { IPayment } from "@/interface/payments";

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
    const paymentData = async () => {
      const token = req.headers.authorization;
      const { shipping_id } = req.query;

      const decoded = token ? decodeJWT(token) : null;

      if (decoded === null) {
        res.status(408).json({ error: "Token timeout" });
      }

      const { error, data, message, code }: IResponseApi<IPayment> =
        await service.getAdminDetailPayment(
          token as string,
          shipping_id as string,
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
      const paymentDetail: any = await paymentData();

      res.status(201).json(paymentDetail);
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
