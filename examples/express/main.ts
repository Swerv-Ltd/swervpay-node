import express from "express";
import env from "dotenv";
import { SwervpayClient } from "@swervpaydev/sdk";

env.config();

const swervpay = new SwervpayClient({
  businessId: "bus_********************",
  secretKey: "sk_dev_********************",
  logLevel: "debug",
});

const app = express();

app.use(
  (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void => {
    express.json()(req, res, next);
  }
);

app.get(
  "/wallet/{id}",
  async (req: express.Request, res: express.Response): Promise<void> => {
    const wallet = await swervpay.wallet.get(req.params.id);
    res.json(wallet);
  }
);

app.get(
  "/wallets",
  async (req: express.Request, res: express.Response): Promise<void> => {
    const wallets = await swervpay.wallet.gets({
      limit: parseInt(req.query.limit as string),
      page: parseInt(req.query.page as string),
    });
    res.json(wallets);
  }
);

app.post(
  "/create-customer",
  async (req: express.Request, res: express.Response): Promise<void> => {
    const customer = await swervpay.customer.create({
      firstname: req.body.first_name,
      lastname: req.body.last_name,
      email: req.body.email,
      middlename: "",
      country: req.body.country,
    });

    res.json(customer);
  }
);

app.get(
  "/customer/{id}",
  async (req: express.Request, res: express.Response): Promise<void> => {
    const customer = await swervpay.customer.get(req.params.id);
    res.json(customer);
  }
);

app.get(
  "/customers",
  async (req: express.Request, res: express.Response): Promise<void> => {
    const customers = await swervpay.customer.gets({
      limit: parseInt(req.query.limit as string),
      page: parseInt(req.query.page as string),
    });
    res.json(customers);
  }
);

app.post(
  "/customer/{id}/update",
  async (req: express.Request, res: express.Response): Promise<void> => {
    const customer = await swervpay.customer.update(req.params.id, {
      email: req.body.email,
      phone_number: req.body.phone_number,
    });
    res.json(customer);
  }
);

app.post(
  "/customer/{id}/kyc",
  async (req: express.Request, res: express.Response): Promise<void> => {
    const customer = await swervpay.customer.kyc(req.params.id, {
      tier: req.body.tier as "ONE" | "TWO" | "FULL",
      document: {
        document_type: req.body.document_type,
        document: req.body.document,
        passport: req.body.passport,
        document_number: req.body.document_number,
      },
      information: {
        address: req.body.address,
        city: req.body.city,
        bvn: req.body.bvn,
        state: req.body.state,
        country: req.body.country,
        postal_code: req.body.postal_code,
      },
    });
    res.json(customer);
  }
);

app.post(
  "/create-payout",
  async (req: express.Request, res: express.Response): Promise<void> => {
    const payout = await swervpay.payout.create({
      amount: req.body.amount,
      currency: req.body.currency,
      bank_code: req.body.bank_code,
      account_number: req.body.account_number,
      naration: req.body.narration,
      email: req.body.email,
      reference: req.body.reference,
    });

    res.json(payout);
  }
);

app.post(
  "/create-card",
  async (req: express.Request, res: express.Response): Promise<void> => {
    const card = await swervpay.card.create({
      amount: req.body.amount,
      currency: req.body.currency,
      customer_id: req.body.customer_id,
      type: req.body.type as "LITE" | "DEFAULT" | "COOPERATE",
      issuer: req.body.issuer as "MASTERCARD" | "VISA",
      name_on_card: req.body.name_on_card,
    });

    res.json(card);
  }
);

app.get(
  "/card/{id}",
  async (req: express.Request, res: express.Response): Promise<void> => {
    const card = await swervpay.card.get(req.params.id);
    res.json(card);
  }
);

app.get(
  "/cards",
  async (req: express.Request, res: express.Response): Promise<void> => {
    const cards = await swervpay.card.gets({
      limit: parseInt(req.query.limit as string),
      page: parseInt(req.query.page as string),
    });
    res.json(cards);
  }
);

app.post(
  "/card/{id}/fund",
  async (req: express.Request, res: express.Response): Promise<void> => {
    await swervpay.card.fund(req.params.id, {
      amount: req.body.amount,
    });
    res.json({ message: "Card funded" });
  }
);

app.post(
  "/card/{id}/withdraw",
  async (req: express.Request, res: express.Response): Promise<void> => {
    await swervpay.card.withdraw(req.params.id, {
      amount: req.body.amount,
    });
    res.json({ message: "Card withdrawn" });
  }
);

app.post(
  "/card/{id}/terminate",
  async (req: express.Request, res: express.Response): Promise<void> => {
    await swervpay.card.terminate(req.params.id);
    res.json({ message: "Card terminated" });
  }
);

app.post(
  "/card/{id}/freeze",
  async (req: express.Request, res: express.Response): Promise<void> => {
    await swervpay.card.freeze(req.params.id);
    res.json({ message: "Card freezed" });
  }
);

app.get(
  "/payout/{id}",
  async (req: express.Request, res: express.Response): Promise<void> => {
    const payout = await swervpay.payout.get(req.params.id);
    res.json(payout);
  }
);

app.get(
  "/transaction/{id}",
  async (req: express.Request, res: express.Response): Promise<void> => {
    const tx = await swervpay.transaction.get(req.params.id);
    res.json(tx);
  }
);

app.get(
  "/transactions",
  async (req: express.Request, res: express.Response): Promise<void> => {
    const txs = await swervpay.transaction.gets({
      limit: parseInt(req.query.limit as string),
      page: parseInt(req.query.page as string),
    });
    res.json(txs);
  }
);

app.post(
  "/webhook/{id}/test",
  async (req: express.Request, res: express.Response): Promise<void> => {
    await swervpay.webhook.test(req.params.id);
    res.json({ message: "Webhook test sent" });
  }
);

app.post(
  "/webhook/{id}/retry",
  async (req: express.Request, res: express.Response): Promise<void> => {
    await swervpay.webhook.retry(req.params.id);
    res.json({ message: "Webhook retry sent" });
  }
);

app.post(
  "/resolve-account-number",
  async (req: express.Request, res: express.Response): Promise<void> => {
    const result = await swervpay.other.resolve_account_number({
      bank_code: req.body.bank_code as string,
      account_number: req.body.account_number as string,
    });
    res.json(result);
  }
);

app.get(
  "/banks",
  async (req: express.Request, res: express.Response): Promise<void> => {
    const banks = await swervpay.other.banks();
    res.json(banks);
  }
);

app.post(
  "/fx/rate",
  async (req: express.Request, res: express.Response): Promise<void> => {
    const result = await swervpay.fx.rate({
      from: req.body.bank_code as string,
      to: req.body.account_number as string,
      amount: req.body.amount as number,
    });
    res.json(result);
  }
);

app.post(
  "/fx/exchange",
  async (req: express.Request, res: express.Response): Promise<void> => {
    const result = await swervpay.fx.exchange({
      from: req.body.bank_code as string,
      to: req.body.account_number as string,
      amount: req.body.amount as number,
    });
    res.json(result);
  }
);

app.listen(3333, () => {
  console.log("Server is running on port 3000");
});
