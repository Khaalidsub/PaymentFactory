import { IPayment } from "./payment.factory";

export class DahabPay implements IPayment {
  createPayment<T>(): T {
    throw new Error("Method not implemented.");
  }
  updateAccount<T>(): T {
    throw new Error("Method not implemented.");
  }
}
