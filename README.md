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
};

const swyftpay = new swervpay.SwyftpayClient(config);

// Create a new customer
await swyftpay.customer.create({
  firstname: "user",
  lastname: "user",
  middlename: "user",
  country: "user",
  email: "user@mailinator.com",
});

// Create a new card
await swyftpay.card.create({
  type: "DEFAULT",
  issuer: "MASTERCARD",
  customer_id: "user",
  currency: "USD",
});

// Create a new payout
await swyftpay.payout.create({
  bank_code: "user",
  account_number: "user",
  amount: "user",
  currency: "NGN",
  reference: "user",
  naration: "user",
  email: "user@mailinator.com",
});
```

Here, we initialize the Swervpay client with our secret key and business id. Then we create a new customer, card and payout.
