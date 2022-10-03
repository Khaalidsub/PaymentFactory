import { ICPaymentRQ, IGPaymentRQ, IPayment } from "./payment.factory";
import CryptoJS from "crypto-js";
import got from "got";

export const prodUrl = "https://edahab.net/api/";
export class DahabPay implements IPayment {
  async createPayment<T>(data: ICPaymentRQ): Promise<T> {
    console.log(`DATA: ${JSON.stringify(data)}`);

    const hash = this.toSHA256(
      {
        amount: data.amount,
        currency: data.currency,
        apiKey: "API_KEY",
        agentCode: "AGENT_CODE",
        edahabNumber: data.accountNo,
      },
      "SECRET_KEY"
    );

    const response: any = await got
      .post(prodUrl + `api/issueinvoice?hash=${hash}`, {
        json: {
          amount: data.amount,
          currency: data.currency,
          apiKey: "API_KEY",
          agentCode: "AGENT_CODE",
          edahabNumber: data.accountNo,
        },
      })
      .json();
    return response;
  }

  toSHA256(RQ: Object, secretKey: string): string {
    const hash = CryptoJS.SHA256(JSON.stringify(RQ) + secretKey).toString(
      CryptoJS.enc.Hex
    );

    return hash;
  }
  async updateAccount<T>(data: IGPaymentRQ): Promise<T> {
    console.log(`DATA: ${JSON.stringify(data)}`);
    const hash = this.toSHA256(
      {
        apiKey: "API_KEY",
        phoneNumber: data.restaurantAccount,
        transactionAmount: data.amount,
        currency: data.currency,
        transactionId: "1234567890",
      },
      "SECRET_KEY"
    );

    const response: any = await got
      .post(prodUrl + `api/agentPayment?hash=${hash}`, {
        json: {
          apiKey: "API_KEY",
          phoneNumber: data.restaurantAccount,
          transactionAmount: data.amount,
          currency: data.currency,
          transactionId: "1234567890",
        },
      })
      .json();
    return response;
  }
}
