import { IResponseApi } from "@/interface/users";
import service from "@/service/service";
import type { NextApiRequest, NextApiResponse } from "next";
import { decodeJWT } from "@/utils/jwtDecode";
import ShortUniqueId from "short-unique-id";
import { ITopUp } from "@/interface/wallet";
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
    const postTopup = async () => {
      const token = req.headers.authorization;
      const uid6 = new ShortUniqueId({ length: 6 });
      const topupId = `topup-${uid6.rnd()}`;
      const { walletId, balance } = req.body;
      const decoded = token ? decodeJWT(token) : null;

      if (decoded === null) {
        res.status(408).json({ error: "Token timeout" });
      }
      const userId = decoded ? decoded.sub : null;
      const date = new Date();

      if (balance < 10000) {
        res.status(400).json({ error: "Minimum TopUp Rp. 10.000" });
      } else if (balance > 10000000) {
        res.status(400).json({ error: "Maximal TopUp Rp. 10.000.000" });
      } else {
        const topUpPayload: ITopUp = {
          owner: userId,
          toWallet: walletId,
          amount: balance,
          id: topupId,
          date: convertDateToMilis(String(date)),
        };
        const { error, data, message, code }: IResponseApi<any> =
          await service.postTopUp(token as string, topUpPayload);

        if (error && code === 401) {
          res.status(code).json({ error: message });
        } else if (error) {
          res.status(400).json({ error: message });
        } else {
          return data;
        }
      }
    };

    try {
      const wallet = await postTopup();

      res.status(201).json({ wallet });
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  } else if (req.method === "GET") {
    const topupData = async () => {
      const token = req.headers.authorization;

      const decoded = token ? decodeJWT(token) : null;

      if (decoded === null) {
        res.status(408).json({ error: "Token timeout" });
      }
      const userId = decoded ? decoded.sub : null;

      const { error, data, message, code }: IResponseApi<any> =
        await service.getTopUpData(token as string, userId);

      if (error && code === 401) {
        res.status(code).json({ error: message });
      } else if (error) {
        res.status(400).json({ error: message });
      } else {
        return data;
      }
    };

    try {
      const topup = await topupData();

      res.status(201).json(topup);
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
