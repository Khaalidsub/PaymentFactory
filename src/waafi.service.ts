import { promisify } from "util";
import { IPayment } from "./payment.factory";

const waafipay = require("waafipay-sdk-node").API(
  "API_KEY",
  "API_SECRET",
  "MERCHENT_ID",
  { testMode: true }
);

const apiPurchase = promisify(waafipay.apiPurchase);

const getCreditAccount = promisify(waafipay.getCreditAccount);

export interface ICPaymentRQ {
  accountNo: string;
  restaurantAccount: string;
  currency: string;
  description?: string;
  amount: number;
}

export interface ICWaafiPayRQ extends ICPaymentRQ {
  paymentMethod?: string;
  browserInfo?: string;
}
export interface IGWaafiPayRQ extends ICPaymentRQ {
  restaurantName?: string;
  paymentMethod?: string;
}
export class WaafiPay implements IPayment {
  async createPayment<T>(
    data: Omit<ICWaafiPayRQ, "restaurantAccount">
  ): Promise<T> {
    const response = await apiPurchase({
      ...data,
      paymentMethod: "MWALLET_ACCOUNT",
      browserInfo: "sadfasdfasd",
      description: "TEST",
    });
    return response;
  }
  async updateAccount<T>(data: IGWaafiPayRQ): Promise<T> {
    const result = await getCreditAccount({
      ...data,
      paymentMethod: "MWALLET_ACCOUNT",
      accountNo: data.restaurantAccount,
      accountHolder: data.restaurantName,
      description: "App name",
    });

    return result;
  }
}
