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
  if (req.method === "POST") {
    // const postTopup = async () => {
    //   const token = req.headers.authorization;
    //   const uid6 = new ShortUniqueId({ length: 6 });
    //   const topupId = `topup-${uid6.rnd()}`;
    //   const { walletId, balance } = req.body;
    //   const decoded = token ? decodeJWT(token) : null;
    //   if (decoded === null) {
    //     res.status(408).json({ error: "Token timeout" });
    //   }
    //   const userId = decoded ? decoded.sub : null;
    //   const date = new Date();
    //   if (balance < 10000) {
    //     res.status(400).json({ error: "Minimum TopUp Rp. 10.000" });
    //   } else if (balance > 10000000) {
    //     res.status(400).json({ error: "Maximal TopUp Rp. 10.000.000" });
    //   } else {
    //     const topUpPayload: ITopUp = {
    //       owner: userId,
    //       toWallet: walletId,
    //       amount: balance,
    //       id: topupId,
    //       date: String(date),
    //     };
    //     const { error, data, message, code }: IResponseApi<any> =
    //       await service.postTopUp(token as string, topUpPayload);
    //     if (error && code === 401) {
    //       res.status(code).json({ error: message });
    //     } else if (error) {
    //       res.status(400).json({ error: message });
    //     } else {
    //       return data;
    //     }
    //   }
    // };
    // try {
    //   const wallet = await postTopup();
    //   res.status(201).json({ wallet });
    // } catch (error) {
    //   res.status(500).json({ error: "Server Error" });
    // }
  } else if (req.method === "GET") {
    const { referal } = req.query;
    const token = req.headers.authorization;

    const decoded = token ? decodeJWT(token) : null;

    if (decoded === null) {
      res.status(408).json({ error: "Token timeout" });
    }
    const userId = decoded ? decoded.sub : null;

    const referalData = async () => {
      const { error, data, message, code }: IResponseApi<any> =
        await service.getReferalData(token as string, referal as string);
      if (data.length === 0) {
        res.status(404).json({ error: "Referal code not belong to anyone" });
      }
      if (error && code === 401) {
        res.status(code).json({ error: message });
      } else if (error) {
        res.status(400).json({ error: message });
      } else {
        return data;
      }
    };

    try {
      const referal = await referalData();
      const { id, fullname, email } = referal[0];
      if (id === userId) {
        res
          .status(401)
          .json({ error: `You can't apply your own referal code` });
      }
      res.status(201).json({ user: { fullname, email } });
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
