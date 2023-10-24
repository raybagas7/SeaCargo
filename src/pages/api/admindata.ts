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
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === "GET") {
    const userData = async () => {
      const token = req.headers.authorization;

      const decoded = token ? decodeJWT(token) : null;

      if (decoded === null) {
        res.status(408).json({ error: "Token timeout" });
      }
      const userId = decoded ? decoded.sub : null;

      const { error, data, message, code }: IResponseApi<any> =
        await service.getUserData(userId, token as string);

      if (error && code === 401) {
        res.status(code).json({ error: message });
      } else if (error) {
        res.status(400).json({ error: message });
      } else {
        return data;
      }
    };

    try {
      const user = await userData();

      const { password, id, ...information } = user[0];

      res.status(201).json({ user: information });
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
      const userId = decoded ? decoded.sub : null;
      const payload = req.body;
      console.log(payload);
      console.log(userId);

      const { error, data, message, code }: IResponseApi<any> =
        await service.updateUserData(userId, token as string, payload);

      if (error && code === 401) {
        res.status(code).json({ error: message });
      } else if (error) {
        res.status(400).json({ error: message });
      } else {
        return data;
      }
    };

    try {
      const user = await updateData();
      console.log(user);

      const { password, id, ...information } = user;

      res.status(201).json({ message: "Success Edit", user: information });
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
