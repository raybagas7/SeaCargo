import { IResponseApi } from "@/interface/users";
import service from "@/service/service";
import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import ShortUniqueId from "short-unique-id";

type Data = {
  name?: string;
  message?: string;
  error?: string;
  data?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === "POST") {
    const data = req.body;
    const uid6 = new ShortUniqueId({ length: 6 });
    const userId = `user-${uid6.rnd()}`;
    const referalId = uid6.rnd();
    const walletId = `wallet-${uid6.rnd()}`;
    const registerPayload = {
      ...data.registerData,
      phone: parseInt(data.registerData.phone),
      id: userId,
      role: "user",
      referal: referalId,
      photo:
        "https://res.cloudinary.com/dro3sbdac/image/upload/v1697347000/zvp2vyyrhjrx5qmzfilk.png",
    };
    const walletPayload = {
      balance: 0,
      userId: userId,
      id: walletId,
    };

    const addWallet = async () => {
      const { error, data, message }: IResponseApi<any> =
        await service.postMakeWallet(walletPayload);
      if (error) {
        res.status(500).json({ error: "Server is on problem" });
      }
    };

    const register = async () => {
      const { error, data, message }: IResponseApi<any> =
        await service.postUserRegister(registerPayload);

      if (error) {
        res.status(409).json({ error: message });
      } else {
        addWallet();
        return data;
      }
    };

    try {
      const { accessToken } = await register();
      const accessTokenCookie = serialize("accessToken", accessToken, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      res.setHeader("Set-Cookie", accessTokenCookie);
      res.status(201).json({ message: "Register Success" });
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
