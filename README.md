<div align="center">
  <a href="https://swervpay.co" target="_blank">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://avatars.githubusercontent.com/u/108650375?s=200&v=4">
    <img src="https://avatars.githubusercontent.com/u/108650375?s=200&v=4" width="60" alt="Logo"/>
  </picture>
  </a>
</div>

<h1 align="center">NodeJS Client for Swervpay</h1>

<p align="center">
    <br />
    <a href="https://docs.swervpay.co" rel="dofollow"><strong>Explore the docs »</strong></a>
    <br />
 </p>
  
<p align="center">  
    <a href="https://twitter.com/swyftpay_io">X (Twitter)</a>
    ·
    <a href="https://www.linkedin.com/company/swervltd">Linkedin</a>
    ·
    <a href="https://docs.swervpay.co/changelog">Changelog</a>
</p>

### Documentation

See [docs for NodeJS here](https://docs.swervpay.co/sdks/nodejs)

### Installation

Install [swervpay-node](https://www.npmjs.com/package/@swervpaydev/sdk) sdk into your new or existing NodeJS application using any of your favorite package manager.

```bash Shell
$ npm install @swervpaydev/sdk
$ yarn add @swervpaydev/sdk
$ pnpm add @swervpaydev/sdk
$ bun install @swervpaydev/sdk
```

### Usage

```javascript NodeJS
const swervpay = require("@swervpaydev/sdk");

const config = {
  secretKey: "<SECRET_KEY>",
  businessId: "<BUSINESS_ID>",
  sandbox: false,
};

const swervpay = new swervpay.SwervpayClient(config);

// Set token manually
swervpay.client.setAccessToken(token)

// Get access token
const token = swervpay.client.getAccessToken

// Create a new customer
const customer = await swervpay.customer.create({
  firstname: req.body.first_name,
  lastname: req.body.last_name,
  email: req.body.email,
  middlename: "",
  country: req.body.country,
});

// Create a new card
const card = await swervpay.card.create({
  amount: req.body.amount,
  currency: req.body.currency,
  customer_id: req.body.customer_id,
  type: req.body.type as "LITE" | "DEFAULT" | "COOPERATE",
  issuer: req.body.issuer as "MASTERCARD" | "VISA",
  name_on_card: req.body.name_on_card
});

// Create a new payout
const payout = await swervpay.payout.create({
  amount: req.body.amount,
  currency: req.body.currency,
  bank_code: req.body.bank_code,
  account_number: req.body.account_number,
  naration: req.body.narration,
  email: req.body.email,
  reference: req.body.reference,
});
```

Here, we initialize the Swervpay client with our secret key and business id. Then we create a new customer, card and payout.

See more [examples](https://github.com/Swerv-Ltd/swervpay-node/tree/main/examples)
