import { IResponseApi } from "@/interface/users";
import service from "@/service/service";
import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

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
    const loginPayload = {
      ...data.loginData,
    };

    const login = async () => {
      const { error, data, message }: IResponseApi<any> =
        await service.postUserLogin(loginPayload);

      if (error) {
        res.status(400).json({ error: message });
      } else {
        return data;
      }
    };

    try {
      const { accessToken } = await login();
      const accessTokenCookie = serialize("accessToken", accessToken, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      res.setHeader("Set-Cookie", accessTokenCookie);
      res.status(201).json({ message: "Login Success" });
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
