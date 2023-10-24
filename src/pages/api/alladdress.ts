import { IAllUserDataResponse, IResponseApi } from "@/interface/users";
import service from "@/service/service";
import type { NextApiRequest, NextApiResponse } from "next";
import { decodeJWT } from "@/utils/jwtDecode";
import { IPagination } from "@/interface/allshipping";
import { IAddress, ICombinedAddressWithUserData } from "@/interface/addresses";

type Data = {
  name?: string;
  message?: string;
  error?: string;
  data?: string;
  user?: object;
  wallet?: object;
  addressList?: ICombinedAddressWithUserData[];
  pagination?: IPagination;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === "GET") {
    const { page, limit, sort, order, q } = req.query;
    console.log(page, limit, sort, order, q);

    const userData = async () => {
      const token = req.headers.authorization;

      const decoded = token ? decodeJWT(token) : null;

      if (decoded === null) {
        res.status(408).json({ error: "Token timeout" });
      }

      const {
        error,
        data,
        message,
        code,
      }: IResponseApi<IAllUserDataResponse[]> = await service.getAllUsers(
        token as string,
      );

      if (error && code === 401) {
        res.status(code).json({ error: message });
      } else if (error) {
        res.status(400).json({ error: message });
      } else {
        return data;
      }
    };

    const countTotalPage = async () => {
      let totalPage = 0;

      const token = req.headers.authorization;

      const decoded = token ? decodeJWT(token) : null;

      if (decoded === null) {
        res.status(408).json({ error: "Token timeout" });
      }

      const { error, data, message, code }: IResponseApi<IAddress[]> =
        await service.getAllUserAddresses(token as string);

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

    const addressesData = async () => {
      const allUser = await userData();
      const totalPage = await countTotalPage();
      let userArrayMap: any = [];
      let combinedAddressUser: any = [];
      let count = 0;

      if (allUser) {
        userArrayMap = allUser.reduce((acc: any, item) => {
          acc[item.id] = {
            owner: item.fullname,
            email: item.email,
            photo: item.photo,
          };
          return acc;
        }, {});
      }

      const token = req.headers.authorization;

      const decoded = token ? decodeJWT(token) : null;

      if (decoded === null) {
        res.status(408).json({ error: "Token timeout" });
      }

      const { error, data, message, code }: IResponseApi<IAddress[]> =
        await service.getAllUserAddressesPerPage(
          token as string,
          parseInt(page as string),
          parseInt(limit as string),
          sort as string,
          order as string,
          q as string,
        );

      if (data) {
        count = data.length;
        combinedAddressUser = data.map((address) => ({
          ...address,
          ...userArrayMap[address.owner],
        }));
      }

      const pagination: IPagination = {
        page: parseInt(page as string),
        size: parseInt(limit as string),
        count: count,
        total_page: totalPage as number,
      };

      if (error && code === 401) {
        res.status(code).json({ error: message });
      } else if (error) {
        res.status(400).json({ error: message });
      } else {
        return { allAddressess: combinedAddressUser, pagination };
      }
    };

    try {
      const { allAddressess, pagination }: any = await addressesData();
      res.status(201).json({
        addressList: allAddressess as ICombinedAddressWithUserData[],
        pagination: pagination,
      });
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
