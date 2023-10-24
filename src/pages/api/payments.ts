import {
  IReferalDataResponse,
  IResponseApi,
  IUserData,
  IUserDataResponse,
} from "@/interface/users";
import service from "@/service/service";
import type { NextApiRequest, NextApiResponse } from "next";
import { decodeJWT } from "@/utils/jwtDecode";
import ShortUniqueId from "short-unique-id";
import { IWallet } from "@/interface/wallet";
import { IPromos } from "@/interface/promos";
import { calculateFinalCost } from "@/utils/calculateFinalCost";
import { IPayment } from "@/interface/payments";
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
    const token = req.headers.authorization;
    const { total_cost, promo_id, referal, shipping_id, shipping_name } =
      req.body;
    console.log(promo_id, referal, total_cost, shipping_id, shipping_name);

    const decoded = token ? decodeJWT(token) : null;
    const userId = decoded ? decoded.sub : null;

    if (decoded === null) {
      res.status(408).json({ error: "Token timeout" });
    }
    const getPromo = async () => {
      const { error, data, message, code }: IResponseApi<IPromos> =
        await service.getSelectedPromo(token as string, promo_id as string);

      if (error && code === 404) {
        res.status(code).json({ error: "Promo not available" });
      } else if (error && code === 401) {
        res.status(code).json({ error: message });
      } else if (error) {
        res.status(400).json({ error: message });
      } else {
        return data;
      }
    };

    const getWallet = async () => {
      const { error, data, message, code }: IResponseApi<IWallet[]> =
        await service.getWalletUserData(userId, token as string);

      if (error && code === 401) {
        res.status(code).json({ error: message });
      } else if (error) {
        res.status(400).json({ error: message });
      } else {
        return data ? data[0] : undefined;
      }
    };

    const getReferalWallet = async (refUserId: string) => {
      const { error, data, message, code }: IResponseApi<IWallet[]> =
        await service.getWalletUserData(refUserId, token as string);

      if (error && code === 401) {
        res.status(code).json({ error: message });
      } else if (error) {
        res.status(400).json({ error: message });
      } else {
        return data ? data[0] : undefined;
      }
    };

    const getReferal = async () => {
      const {
        error,
        data,
        message,
        code,
      }: IResponseApi<IReferalDataResponse[]> = await service.getReferalData(
        token as string,
        referal as string,
      );
      if (data?.length === 0) {
        res.status(404).json({ error: "Referal code not belong to anyone" });
      }
      if (error && code === 401) {
        res.status(code).json({ error: message });
      } else if (error) {
        res.status(400).json({ error: message });
      } else {
        return data ? data[0] : undefined;
      }
    };

    const calculatePayment = async () => {
      let promoData: IPromos | undefined = undefined;
      let walletData: IWallet | undefined = undefined;
      let referalData: IReferalDataResponse | undefined = undefined;
      let userNeedTopay: number = total_cost;
      let referalWalletData: IWallet | undefined = undefined;
      let referalBonus: number = 1000;
      const walletRes = await getWallet();
      walletData = walletRes ? walletRes : undefined;
      console.log(walletRes);

      if (promo_id) {
        const promoRes = await getPromo();
        console.log(promoRes);
        // await service.getWalletUserData(promoRes.id, token as string);

        promoData = promoRes ? promoRes : undefined;
      }

      if (referal) {
        const referealRes = await getReferal();
        if (referealRes) {
          const refWalletRes = await getReferalWallet(referealRes.id);
          console.log(refWalletRes);
          referalWalletData = refWalletRes;
        }
        console.log(referealRes);
        referalData = referealRes ? referealRes : undefined;
      }

      console.log(walletData);
      console.log(promoData);
      console.log(referalData);
      console.log(referalWalletData);

      if (promoData) {
        userNeedTopay = calculateFinalCost(
          total_cost,
          promoData.value,
          promoData.max,
        );
      }

      if (walletData) {
        const uid6 = new ShortUniqueId({ length: 6 });
        const paymentId = `payment-${uid6.rnd()}`;
        const date = new Date();

        const paymentPayload: IPayment = {
          id: paymentId,
          userId: userId,
          shipping_id: shipping_id,
          promo_id: promoData ? promoData.id : "",
          shipping_name: shipping_name,
          base_cost: parseInt(String(total_cost)),
          final_cost: parseInt(String(userNeedTopay)),
          date: convertDateToMilis(String(date)),
          discount: promoData ? parseInt(String(promoData.value)) : 0,
          max_discount: promoData ? parseInt(String(promoData.max)) : 0,
          promo_name: promoData ? promoData.name : "",
          referal: referal,
        };
        if (walletData.balance < userNeedTopay) {
          res.status(400).json({ error: "Not enough Balance" });
        } else {
          const updatedBalance = walletData.balance - userNeedTopay;
          const { error, data, message, code }: IResponseApi<any> =
            await service.patchWallet(
              walletData.id,
              token as string,
              updatedBalance,
            );

          if (error && code === 401) {
            res.status(code).json({ error: message });
          } else if (error) {
            res.status(400).json({ error: message });
          } else {
            const { error, data, message, code }: IResponseApi<any> =
              await service.postNewPayment(token as string, paymentPayload);
            if (promoData) {
              await service.patchPromo(
                promo_id,
                token as string,
                promoData.count - 1,
              );
            }
            await service.patchShippingToPaid(shipping_id, token as string);
            if (referal && referalWalletData && referalData) {
              console.log(referalWalletData.id);
              console.log(referalWalletData.balance);

              const refUpdatedBalance =
                referalWalletData.balance + referalBonus;
              await service.patchReferalWallet(
                referalWalletData.id,
                token as string,
                refUpdatedBalance,
              );
            }
            return data;
          }
        }
      }
      console.log(userNeedTopay);
    };

    try {
      const paymentData = await calculatePayment();
      console.log(paymentData);

      res.status(201).json({ message: "Success Payment", data: paymentData });
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
