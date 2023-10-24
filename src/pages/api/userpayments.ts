import { IResponseApi } from "@/interface/users";
import service from "@/service/service";
import type { NextApiRequest, NextApiResponse } from "next";
import { decodeJWT } from "@/utils/jwtDecode";
import { IPayment } from "@/interface/payments";
import { IPaginationResponse } from "@/interface/pagination";

type Data = {
  name?: string;
  message?: string;
  error?: string;
  data?: string;
  user?: object;
  wallet?: object;
  paymentList?: IPayment[];
  pagination?: IPaginationResponse;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === "GET") {
    const { page, limit, sort, order, q } = req.query;

    const countTotalPage = async () => {
      let totalPage = 0;

      const token = req.headers.authorization;

      const decoded = token ? decodeJWT(token) : null;

      if (decoded === null) {
        res.status(408).json({ error: "Token timeout" });
      }
      const userId = decoded ? decoded.sub : null;

      const { error, data, message, code }: IResponseApi<IPayment[]> =
        await service.getAllUserPayments(token as string, userId);

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

    const paymentsData = async () => {
      const totalPage = await countTotalPage();

      const token = req.headers.authorization;

      const decoded = token ? decodeJWT(token) : null;

      if (decoded === null) {
        res.status(408).json({ error: "Token timeout" });
      }
      const userId = decoded ? decoded.sub : null;

      const { error, data, message, code }: IResponseApi<any> =
        await service.getUserPayments(
          token as string,
          userId,
          parseInt(page as string),
          parseInt(limit as string),
          sort as string,
          order as string,
          q as string,
        );

      const pagination: IPaginationResponse = {
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
        return { allPayments: data, pagination };
      }
    };

    try {
      const { allPayments, pagination }: any = await paymentsData();

      res.status(201).json({
        paymentList: allPayments as IPayment[],
        pagination: pagination,
      });
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
