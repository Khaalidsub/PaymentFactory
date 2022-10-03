import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { promisify } from "util";
import { IPaymentType, PaymentFactory } from "./payment.factory";

const app = express();
const port = 3030;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const paymentFactory = new PaymentFactory();
app.post("/createPayment", async (req: Request, res: Response) => {
  const { accountNo, amount, currency } = req.body.userInfo;
  const { restaurantAccount, restaurantName, paymentType } = req.body;

  const response = await paymentFactory
    .createPaymentFactory(
      paymentType == "WAAFI" ? IPaymentType.WAAFI : IPaymentType.EDAHAB
    )
    .createPayment({
      accountNo,
      amount,
      currency,
    });

  console.log(`response ${JSON.stringify(response)}`);
  console.log(paymentType);

  const result = await paymentFactory
    .createPaymentFactory(
      paymentType == "WAAFI" ? IPaymentType.WAAFI : IPaymentType.EDAHAB
    )
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
