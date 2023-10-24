import { IResponseApi } from "@/interface/users";
import service from "@/service/service";
import type { NextApiRequest, NextApiResponse } from "next";
import { decodeJWT } from "@/utils/jwtDecode";
import ShortUniqueId from "short-unique-id";
import { IPromos } from "@/interface/promos";
import { convertDateToMilis } from "@/utils/convertDateToMilis";
import { IReview } from "@/interface/shippings";

type Data = {
  name?: string;
  message?: string;
  error?: string;
  data?: string;
  user?: object;
  wallet?: object;
  promo?: object;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === "POST") {
    const postReview = async () => {
      const token = req.headers.authorization;
      const uid6 = new ShortUniqueId({ length: 6 });
      const reviewId = `review-${uid6.rnd()}`;
      const { review, shipping_id } = req.body;

      const decoded = token ? decodeJWT(token) : null;
      if (decoded === null) {
        res.status(408).json({ error: "Token timeout" });
      }
      const userId = decoded.sub;

      const date = new Date();

      const reviewPayload: IReview = {
        id: reviewId,
        userId: userId,
        shipping_id: shipping_id,
        review: review,
        createdAt: convertDateToMilis(String(date)),
        updatedAt: convertDateToMilis(String(date)),
      };

      const { error, data, message, code }: IResponseApi<any> =
        await service.postReview(token as string, reviewPayload);

      if (error && code === 401) {
        res.status(code).json({ error: message });
      } else if (error) {
        res.status(400).json({ error: message });
      } else {
        return data;
      }
    };
    try {
      const review = await postReview();
      res.status(201).json(review);
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  } else if (req.method === "GET") {
    const reviewData = async () => {
      const token = req.headers.authorization;
      const { shipping_id } = req.query;
      const decoded = token ? decodeJWT(token) : null;

      if (decoded === null) {
        res.status(408).json({ error: "Token timeout" });
      }
      const { error, data, message, code }: IResponseApi<any> =
        await service.getReview(token as string, shipping_id as string);

      if (error && code === 401) {
        res.status(code).json({ error: message });
      } else if (error) {
        res.status(400).json({ error: message });
      } else {
        return data;
      }
    };

    try {
      const review = await reviewData();
      res.status(201).json(review);
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
