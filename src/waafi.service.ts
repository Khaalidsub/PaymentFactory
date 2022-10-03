import { promisify } from "util";
import { ICPaymentRQ, IGPaymentRQ, IPayment } from "./payment.factory";

const waafipay = require("waafipay-sdk-node").API(
  "API_KEY",
  "API_SECRET",
  "MERCHENT_ID",
  { testMode: true }
);

const apiPurchase = promisify(waafipay.apiPurchase);

const getCreditAccount = promisify(waafipay.getCreditAccount);

export interface IGWaafiPayRQ extends ICPaymentRQ {
  restaurantName?: string;
}
export class WaafiPay implements IPayment {
  async createPayment<T>(data: ICPaymentRQ): Promise<T> {
    console.log(`DATA: ${JSON.stringify(data)}`);
    const response = await apiPurchase({
      accountNo: data.accountNo,
      currency: data.currency,
      amount: data.amount,
      paymentMethod: "MWALLET_ACCOUNT",
      browserInfo: "sadfasdfasd",
      description: "TEST",
    });
    return response;
  }
  async updateAccount<T>(data: IGPaymentRQ): Promise<T> {
    console.log(`DATA: ${JSON.stringify(data)}`);
    const result = await getCreditAccount({
      amount: data.amount,
      currency: data.currency,
      paymentMethod: "MWALLET_ACCOUNT",
      accountNo: data.restaurantAccount,
      accountHolder: data.restaurantName,
      description: "App name",
    });

    return result;
  }
}
