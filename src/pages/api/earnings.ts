import { IAllUserDataResponse, IResponseApi } from "@/interface/users";
import service from "@/service/service";
import type { NextApiRequest, NextApiResponse } from "next";
import { decodeJWT } from "@/utils/jwtDecode";
import {
  ICombinedShippingWithUserData,
  IShippingDataPayload,
} from "@/interface/shippings";
import { IPagination } from "@/interface/allshipping";
import { ITopUp } from "@/interface/wallet";
import { IPayment } from "@/interface/payments";

type Data = {
  name?: string;
  message?: string;
  error?: string;
  data?: string;
  user?: object;
  wallet?: object;
  shippingList?: IShippingDataPayload[];
  pagination?: IPagination;
  total_paid?: number;
  total_unpaid?: number;
  total_cancel?: number;
  total_delivered?: number;
  total_shipped?: number;
  total_shippings?: number;
  total_topup?: number;
  total_topup_amount?: number;
  total_payment?: number;
  total_payment_amount?: number;
  total_cutted_amount?: number;
  total_base_amount?: number;
  total_final_cost?: number;
  total_shipping_cost?: number;
  total_shipping_paid?: number;
  total_pending?: number;
  total_insurance?: number;
  total_gogreen?: number;
  total_donation?: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === "GET") {
    const getAllShippingRelated = async () => {
      let total_paid;
      let total_unpaid;
      let total_shipped;
      let total_delivered;
      let total_cancel;
      let total_shippings;
      let total_shipping_cost;
      let total_shipping_paid;
      let total_pending;
      let total_insurance;
      let total_gogreen;
      let total_donation;
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
      }: IResponseApi<IShippingDataPayload[]> = await service.getAllShippings(
        token as string,
      );

      if (data) {
        total_paid = data.filter((data) => data.paid).length;
        total_unpaid = data.filter((data) => data.paid === false).length;
        total_shipped = data.filter(
          (data) => data.shipped === true && data.delivered === false,
        ).length;
        total_delivered = data.filter((data) => data.delivered).length;
        total_cancel = data.filter((data) => data.cancel).length;
        total_shippings = data.length;
        total_shipping_cost = data.reduce(
          (total, shipping) => total + shipping.totalCost,
          0,
        );
        total_shipping_paid = data.reduce((total, shipping) => {
          if (shipping.paid) {
            return total + shipping.totalCost;
          }
          return total;
        }, 0);
        total_pending = data.reduce((total, shipping) => {
          if (!shipping.paid) {
            return total + shipping.totalCost;
          }
          return total;
        }, 0);
        total_insurance = data.reduce((total, shipping) => {
          if (shipping.item_props.insurance) {
            return total + 1;
          }
          return total;
        }, 0);
        total_gogreen = data.reduce((total, shipping) => {
          if (shipping.item_props.gogreen) {
            return total + 1;
          }
          return total;
        }, 0);
        total_donation = data.reduce((total, shipping) => {
          if (shipping.item_props.donation) {
            return total + 1;
          }
          return total;
        }, 0);
      }

      if (error && code === 401) {
        res.status(code).json({ error: message });
      } else if (error) {
        res.status(400).json({ error: message });
      } else {
        return {
          total_paid,
          total_unpaid,
          total_shipped,
          total_delivered,
          total_cancel,
          total_shippings,
          total_shipping_cost,
          total_shipping_paid,
          total_pending,
          total_insurance,
          total_gogreen,
          total_donation,
        };
      }
    };

    const getAllTopUpRelated = async () => {
      let total_topup_amount;
      let total_topup;
      const token = req.headers.authorization;

      const decoded = token ? decodeJWT(token) : null;

      if (decoded === null) {
        res.status(408).json({ error: "Token timeout" });
      }

      const { error, data, message, code }: IResponseApi<ITopUp[]> =
        await service.getAllTopUp(token as string);

      if (data) {
        total_topup = data.length;
        total_topup_amount = data.reduce(
          (total, topup) => total + topup.amount,
          0,
        );
      }

      if (error && code === 401) {
        res.status(code).json({ error: message });
      } else if (error) {
        res.status(400).json({ error: message });
      } else {
        return {
          total_topup,
          total_topup_amount,
        };
      }
    };

    const getAllPaymentRelated = async () => {
      let total_payment_amount;
      let total_base_amount;
      let total_cutted_amount;
      let total_payment;
      let total_final_cost;
      const token = req.headers.authorization;

      const decoded = token ? decodeJWT(token) : null;

      if (decoded === null) {
        res.status(408).json({ error: "Token timeout" });
      }

      const { error, data, message, code }: IResponseApi<IPayment[]> =
        await service.getAllPayments(token as string);

      if (data) {
        total_payment = data.length;
        total_payment_amount = data.reduce(
          (total, payment) => total + payment.base_cost,
          0,
        );
        total_final_cost = data.reduce(
          (total, payment) => total + payment.final_cost,
          0,
        );
        total_cutted_amount = data.reduce((total, payment) => {
          if (payment.discount !== 0) {
            const cutAmount = payment.base_cost - payment.final_cost;
            return total + cutAmount;
          }
          return total;
        }, 0);
        total_base_amount = data.reduce((total, payment) => {
          if (payment.discount) {
            const cutAmount = payment.base_cost;
            return total + cutAmount;
          }
          return total;
        }, 0);
      }

      if (error && code === 401) {
        res.status(code).json({ error: message });
      } else if (error) {
        res.status(400).json({ error: message });
      } else {
        return {
          total_payment,
          total_payment_amount,
          total_cutted_amount,
          total_base_amount,
          total_final_cost,
        };
      }
    };

    try {
      const {
        total_paid,
        total_unpaid,
        total_cancel,
        total_delivered,
        total_shipped,
        total_shippings,
        total_shipping_cost,
        total_shipping_paid,
        total_pending,
        total_insurance,
        total_gogreen,
        total_donation,
      }: any = await getAllShippingRelated();
      const { total_topup, total_topup_amount }: any =
        await getAllTopUpRelated();
      const {
        total_payment,
        total_payment_amount,
        total_cutted_amount,
        total_base_amount,
        total_final_cost,
      }: any = await getAllPaymentRelated();
      res.status(201).json({
        total_paid,
        total_unpaid,
        total_cancel,
        total_delivered,
        total_shipped,
        total_shippings,
        total_shipping_cost,
        total_shipping_paid,
        total_pending,
        total_insurance,
        total_gogreen,
        total_donation,
        total_topup,
        total_topup_amount,
        total_payment,
        total_payment_amount,
        total_cutted_amount,
        total_base_amount,
        total_final_cost,
      });
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
