import { DahabPay } from "./edahab.service";
import { WaafiPay } from "./waafi.service";

export interface IPayment {
  createPayment<T>(data: unknown): Promise<T>;
  updateAccount<T>(data: unknown): Promise<T>;
}

export enum IPaymentType {
  WAAFI,
  EDAHAB,
}

export class PaymentFactory {
  createPaymentFactory(paymentType: IPaymentType) {
    if (paymentType === IPaymentType.WAAFI) {
      return new WaafiPay();
    } else {
      return new DahabPay();
    }
  }
}