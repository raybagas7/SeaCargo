import { IResponseApi } from "@/interface/users";
import service from "@/service/service";
import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import { getCookie } from "cookies-next";
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
    const walletData = async () => {
      const token = req.headers.authorization;

      const decoded = token ? decodeJWT(token) : null;

      if (decoded === null) {
        res.status(408).json({ error: "Token timeout" });
      }
      const userId = decoded ? decoded.sub : null;

      const { error, data, message, code }: IResponseApi<any> =
        await service.getWalletUserData(userId, token as string);

      if (error && code === 401) {
        res.status(code).json({ error: message });
      } else if (error) {
        res.status(400).json({ error: message });
      } else {
        return data;
      }
    };

    try {
      const response = await walletData();

      const wallet = response[0];

      res.status(201).json({ wallet });
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  } else if (req.method === "PATCH") {
    const updateData = async () => {
      const token = req.headers.authorization;
      const decoded = token ? decodeJWT(token) : null;
      if (decoded === null) {
        res.status(408).json({ error: "Token timeout" });
      }
      const { walletId, currentBalance, balance } = req.body;

      if (balance < 10000) {
        res.status(400).json({ error: "Balance not updated" });
      } else if (balance > 10000000) {
        res.status(400).json({ error: "Balance not updated" });
      } else {
        const totalBalance = currentBalance + balance;
        const { error, data, message, code }: IResponseApi<any> =
          await service.patchWallet(walletId, token as string, totalBalance);

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
      const wallet = await updateData();

      res.status(201).json({ message: "TopUp Success", wallet });
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
