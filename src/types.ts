import { z } from "zod";

const LogLevel = z.enum(["debug", "info", "warn", "error"]);

export type LogLevel = z.infer<typeof LogLevel>;

const SwervpayClientOption = z.object({
  businessId: z.string(),
  secretKey: z.string(),
  sandbox: z.boolean().default(false).optional(),
  timeout: z.number().default(30000).optional(),
  version: z.string().default("v1").optional(),
  baseUrl: z.string().default("https://app.swervpay.co/api/").optional(),
  logLevel: LogLevel.optional(),
  accessToken: z.string().optional(),
});

export type SwervpayClientOption = z.infer<typeof SwervpayClientOption>;

export const CustomerModelSchema = z.object({
  country: z.string(),
  created_at: z.coerce.date(),
  email: z.string(),
  first_name: z.string(),
  id: z.string(),
  is_blacklisted: z.boolean(),
  last_name: z.string(),
  middle_name: z.string(),
  phone_number: z.string(),
  status: z.string(),
  updated_at: z.coerce.date(),
});

export type CustomerModel = z.infer<typeof CustomerModelSchema>;

export const CardModelSchema = z.object({
  address_city: z.string(),
  address_country: z.string(),
  address_postal_code: z.string(),
  address_state: z.string(),
  address_street: z.string(),
  balance: z.number(),
  card_number: z.string(),
  created_at: z.coerce.date(),
  currency: z.string(),
  cvv: z.string(),
  expiry: z.string(),
  freeze: z.boolean(),
  id: z.string(),
  issuer: z.string(),
  masked_pan: z.string(),
  name_on_card: z.string(),
  status: z.string(),
  total_funded: z.number(),
  type: z.string(),
  updated_at: z.coerce.date(),
});

export type CardModel = z.infer<typeof CardModelSchema>;

export const WalletModelSchema = z.object({
  account_name: z.string(),
  account_number: z.string(),
  account_type: z.string(),
  address: z.string(),
  balance: z.number(),
  bank_address: z.string(),
  bank_code: z.string(),
  bank_name: z.string(),
  created_at: z.coerce.date(),
  customer_id: z.string(),
  id: z.string(),
  label: z.string(),
  pending_balance: z.number(),
  reference: z.string(),
  routing_number: z.string(),
  total_received: z.number(),
  updated_at: z.coerce.date(),
});
export type WalletModel = z.infer<typeof WalletModelSchema>;

export const TransactionModelSchema = z.object({
  account_name: z.string(),
  account_number: z.string(),
  amount: z.number(),
  bank_code: z.string(),
  bank_name: z.string(),
  category: z.string(),
  charges: z.number(),
  created_at: z.coerce.date(),
  detail: z.string(),
  fiat_rate: z.number(),
  id: z.string(),
  reference: z.string(),
  report: z.boolean(),
  report_message: z.string(),
  session_id: z.string(),
  status: z.string(),
  type: z.string(),
  updated_at: z.coerce.date(),
});
export type TransactionModel = z.infer<typeof TransactionModelSchema>;

export const BankModelSchema = z.object({
  bank_code: z.string(),
  bank_name: z.string(),
});
export type BankModel = z.infer<typeof BankModelSchema>;

export const ResolveAccountModelSchema = z.object({
  account_name: z.string(),
  account_number: z.string(),
  bank_code: z.string(),
  bank_name: z.string(),
});
export type ResolveAccountModel = z.infer<typeof ResolveAccountModelSchema>;

export const SuccessResponseSchema = z.object({
  message: z.string(),
});
export type SuccessResponse = z.infer<typeof SuccessResponseSchema>;

export const ErrorResponseSchema = SuccessResponseSchema.extend({
  values: z.unknown(),
});

export type ErrorReponse = z.infer<typeof ErrorResponseSchema>;

export const CreateCustomerSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  middlename: z.string(),
  country: z.string(),
  email: z.string(),
});
export type CreateCustomerBody = z.infer<typeof CreateCustomerSchema>;

export const InformationSchema = z.object({
  address: z.string(),
  city: z.string(),
  bvn: z.string(),
  state: z.string(),
  country: z.string(),
  postal_code: z.string(),
});
export type Information = z.infer<typeof InformationSchema>;

export const DocumentSchema = z.object({
  document_type: z.string(),
  document: z.string(),
  passport: z.string(),
  document_number: z.string(),
});
export type Document = z.infer<typeof DocumentSchema>;

export const CustomerKycSchema = z
  .object({
    tier: z.enum(["ONE", "TWO", "FULL"]),
    document: DocumentSchema.optional(),
    information: InformationSchema.optional(),
  })
  .refine((data) => {
    if (data.tier === "FULL") {
      return data.information !== undefined && data.document !== undefined;
    }

    if (data.tier === "TWO") {
      return data.document !== undefined;
    }

    if (data.tier === "ONE") {
      return data.information !== undefined;
    }
    return true;
  });
export type CustomerKycBody = z.infer<typeof CustomerKycSchema>;

export const UpdateCustomerSchema = z.object({
  phone_number: z.string(),
  email: z.string(),
});
export type UpdateCustomerBody = z.infer<typeof UpdateCustomerSchema>;

export const ResolveAccountSchema = z.object({
  bank_code: z.string(),
  account_number: z.string(),
});
export type ResolveAccountBody = z.infer<typeof ResolveAccountSchema>;

export const FundOrWithdrawCardSchema = z.object({
  amount: z.number(),
});
export type FundOrWithdrawCardBody = z.infer<typeof FundOrWithdrawCardSchema>;

export const CreateCardSchema = FundOrWithdrawCardSchema.extend({
  type: z.enum(["LITE", "COOPERATE", "DEFAULT"]).default("DEFAULT"),
  issuer: z.enum(["MASTERCARD", "VISA"]),
  customer_id: z.string().optional(),
  currency: z.string().default("USD"),
  name_on_card: z.string().optional(),
}).refine(
  (data) => {
    if (data.type !== "LITE") {
      return data.customer_id !== undefined;
    }
    return true;
  },
  {
    message: "customer_id is required for non-lite card",
    path: ["customer_id"],
  }
);
export type CreateCardBody = z.infer<typeof CreateCardSchema>;

export const PageAndLimitQuerySchema = z.object({
  page: z.number().default(1),
  limit: z.number().default(10),
});
export type PageAndLimitQuery = z.infer<typeof PageAndLimitQuerySchema>;

export const BusinessModelSchema = z.object({
  address: z.string(),
  country: z.string(),
  created_at: z.coerce.date(),
  email: z.string(),
  id: z.string(),
  logo: z.string(),
  slug: z.string(),
  type: z.string(),
  updated_at: z.coerce.date(),
});
export type BusinessModel = z.infer<typeof BusinessModelSchema>;

export const TokenSchema = z.object({
  business_id: z.string(),
  type: z.string(),
  expires_at: z.number(),
  issued_at: z.number(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});
export type Token = z.infer<typeof TokenSchema>;

export const AuthTokenModelSchema = z.object({
  access_token: z.string(),
  token: TokenSchema,
});
export type AuthTokenModel = z.infer<typeof AuthTokenModelSchema>;

export const CreatePayoutBodySchema = z.object({
  bank_code: z.string(),
  account_number: z.string(),
  amount: z.string(),
  currency: z.string().default("NGN"),
  reference: z.string().optional(),
  naration: z.string().optional(),
  email: z.string(),
});
export type CreatePayoutBody = z.infer<typeof CreatePayoutBodySchema>;

export const FxBodySchema = z.object({
  from: z.string(),
  to: z.string(),
  amount: z.number(),
});
export type FxBody = z.infer<typeof FxBodySchema>;

export const FromOrToSchema = z.object({
  amount: z.number(),
  currency: z.string(),
});
export type FromOrTo = z.infer<typeof FromOrToSchema>;

export const ExchangeRateResponseSchema = z.object({
  from: FromOrToSchema,
  rate: z.number(),
  to: FromOrToSchema,
});
export type ExchangeRateResponse = z.infer<typeof ExchangeRateResponseSchema>;

export const CreateCardResponseSchema = z.object({
  card_id: z.string(),
  message: z.string(),
});
export type CreateCardResponse = z.infer<typeof CreateCardResponseSchema>;

export const CreatePayoutResponseSchema = z.object({
  message: z.string(),
  reference: z.string(),
});
export type CreatePayoutResponse = z.infer<typeof CreatePayoutResponseSchema>;
