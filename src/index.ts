import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { promisify } from "util";
import { IPaymentType, PaymentFactory } from "./payment.factory";

const app = express();
const port = 3030;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const paymentFactory = new PaymentFactory();
app.post("/createWaafi", async (req: Request, res: Response) => {
  const { accountNo, amount, currency } = req.body.userInfo;
  const { restaurantAccount, restaurantName } = req.body;

  const response = await paymentFactory
    .createPaymentFactory(IPaymentType.WAAFI)
    .createPayment({
      accountNo,
      amount,
      currency,
    });

  console.log(`response ${JSON.stringify(response)}`);

  const result = await paymentFactory
    .createPaymentFactory(IPaymentType.WAAFI)
    .updateAccount({
      accountNo,
      amount,
      currency,
      restaurantName,
      restaurantAccount,
    });

  console.log(`response ${JSON.stringify(result)}`);

  res.json({ response, result });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// const payment = new PaymentFactory();

// const response = payment
//   .createPaymentFactory(IPaymentType.WAAFI)
//   .createPayment<ICWaafiPayRQ>({
//     accountNo: "252634034190",
//     restaurantAccount: "252634034190",
//     currency: "SLSH",
//     amount: 500,
//   });

// console.log(response);
