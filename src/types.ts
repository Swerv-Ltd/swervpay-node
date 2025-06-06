import { z } from "zod";

const LogLevel = z.enum(["log", "debug", "info", "warn", "error"]);

export type LogLevel = z.infer<typeof LogLevel>;

const SwervpayClientOption = z.object({
  businessId: z.string(),
  secretKey: z.string(),
  sandbox: z.boolean().default(false).optional(),
  timeout: z.number().optional(),
  version: z.string().default("v1").optional(),
  baseUrl: z.string().default("https://api.swervpay.co/api/").optional(),
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
  payment_method: z.string().optional(),
  trace_number: z.string().optional(),
  imad: z.string().optional(),
  collection: WalletModelSchema.optional(),
  wallet: WalletModelSchema.optional(),
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

export const InformationSchema = z
  .object({
    address: z.string(),
    city: z.string(),
    bvn: z.string().optional(),
    ssnit: z.string().optional(),
    state: z.string(),
    country: z.enum(["Nigeria", "Ghana"]),
    postal_code: z.string(),
    phone_number: z.string(),
    date_of_birth: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.bvn == undefined || data.ssnit == undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "bvn or ssnit is required",
      });

      return z.NEVER;
    }

    if (data.country === "Nigeria" && data.bvn === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "bvn is required",
      });

      return z.NEVER;
    }

    if (data.country === "Ghana" && data.ssnit === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "ssnit is required",
      });

      return z.NEVER;
    }
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
  .superRefine((data, ctx) => {
    if (
      data.tier === "FULL" &&
      data.information == undefined &&
      data.document == undefined
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "document and information is required for full kyc",
      });

      return z.NEVER;
    }

    if (data.tier === "TWO" && data.document == undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "document is required for tier two kyc",
      });
      return z.NEVER;
    }

    if (data.tier === "ONE" && data.information == undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "information is required for tier one kyc",
      });
      return z.NEVER;
    }
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

export const CreateCardBodySchema = FundOrWithdrawCardSchema.extend({
  type: z.enum(["LITE", "COOPERATE", "DEFAULT"]).default("DEFAULT"),
  issuer: z.enum(["MASTERCARD", "VISA"]),
  customer_id: z.string().optional(),
  currency: z.enum(["NGN", "USD"]).default("USD"),
  name_on_card: z.string().optional(),
  expiry_date: z.string().optional(),
  phone_number: z.string().optional(),
  document: z
    .object({
      document_type: z.string(),
      document_number: z.string(),
    })
    .optional(),
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
export type CreateCardBody = z.infer<typeof CreateCardBodySchema>;

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
  type: z.string(),
  expires_at: z.number(),
  issued_at: z.number(),
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
  amount: z.number(),
  currency: z.enum(["NGN", "USD"]).default("NGN"),
  reference: z.string().optional(),
  narration: z.string().optional(),
});
export type CreatePayoutBody = z.infer<typeof CreatePayoutBodySchema>;

export const FxBodySchema = z.object({
  from: z.enum(["NGN", "USD"]),
  to: z.enum(["NGN", "USD"]),
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
  id: z.string(),
});
export type CreatePayoutResponse = z.infer<typeof CreatePayoutResponseSchema>;

export const CardTransactionResponseSchema = z.object({
  amount: z.string(),
  category: z.string(),
  charges: z.string(),
  created_at: z.string(),
  currency: z.string(),
  id: z.string(),
  merchant_city: z.string(),
  merchant_country: z.string(),
  merchant_mcc: z.string(),
  merchant_mid: z.string(),
  merchant_name: z.string(),
  merchant_postal_code: z.string(),
  merchant_state: z.string(),
  reference: z.string(),
  report: z.string(),
  report_message: z.string(),
  status: z.string(),
  type: z.string(),
  updated_at: z.string(),
});
export type CardTransactionResponse = z.infer<
  typeof CardTransactionResponseSchema
>;

export const CollectionHistoryResponseSchema = z.object({
  amount: z.string(),
  charges: z.string(),
  created_at: z.string(),
  currency: z.string(),
  id: z.string(),
  payment_method: z.string(),
  reference: z.string(),
  updated_at: z.string(),
});
export type CollectionHistoryResponse = z.infer<
  typeof CollectionHistoryResponseSchema
>;

export const CreateCollectionBodySchema = z
  .object({
    reference: z.string().optional(),
    customer_id: z.string().optional(),
    currency: z.enum(["NGN", "USD"]),
    merchant_name: z.string(),
    amount: z.number(),
    type: z.enum(["DEFAULT", "ONE_TIME"]),
    additional_information: z
      .object({
        nin: z.string(),
        date_of_birth: z.string(),
        account_type: z.enum(["INDIVIDUAL"]),
        utility_bill: z.string(),
        tax_number: z.string(),
        bank_statement: z.string(),
        source_of_income: z.enum([
          "SALARY",
          "SAVINGS",
          "GIFTS",
          "BUSINESS",
          "INVESTMENT",
          "REMITTANCE",
          "OTHER",
        ]),
        income_band: z.enum([
          "UNDER_5000",
          "UNDER_10000",
          "UNDER_20000",
          "UNDER_50000",
          "ABOVE_50000",
        ]),
        account_designation: z.enum([
          "PERSONAL",
          "DONATION",
          "GOODS_PURCHASE",
          "BUSINESS",
          "INVESTMENT",
          "REMITTANCE",
        ]),
        employment_status: z.enum([
          "EMPLOYED",
          "SELF_EMPLOYED",
          "UNEMPLOYED",
          "RETIRED",
          "STUDENT",
        ]),
        address: z.object({
          street: z.string(),
          city: z.string(),
          state: z.string(),
          country: z.enum(["Nigeria"]),
          zip_code: z.string(),
        }),
        document: z.object({
          expiry_date: z.string(),
          issue_date: z.string(),
          number: z.string(),
          type: z.enum(["PASSPORT", "NIN", "DRIVERS_LICENSE"]),
          urls: z.array(z.string()),
        }),
      })
      .optional(),
  })
  .refine(
    (data) => {
      if (data.type === "DEFAULT") {
        return data.customer_id !== undefined;
      }

      if (data.currency == "USD") {
        return data.additional_information !== undefined;
      }

      return true;
    },
    {
      message: "customer_id is required for non-lite card",
      path: ["customer_id"],
    }
  );
export type CreateCollectionBody = z.infer<typeof CreateCollectionBodySchema>;

export const FundOrWithdrawCardResponseSchema = SuccessResponseSchema.extend({
  transaction: TransactionModelSchema,
});

export type FundOrWithdrawCardResponse = z.infer<
  typeof FundOrWithdrawCardResponseSchema
>;

export const IdentityBvnBodySchema = z.object({
  number: z.string().length(11),
});
export type IdentityBvnBody = z.infer<typeof IdentityBvnBodySchema>;

export const IdentityBvnModelSchema = z.object({
  bvn: z.string(),
  date_of_birth: z.string(),
  email: z.string(),
  enrollment_bank: z.string(),
  enrollment_branch: z.string(),
  first_name: z.string(),
  gender: z.string(),
  last_name: z.string(),
  lga_of_Origin: z.string(),
  lga_of_residence: z.string(),
  marital_status: z.string(),
  middle_name: z.string(),
  nationality: z.string(),
  phone_number: z.string(),
  registration_date: z.string(),
  residential_address: z.string(),
  state_of_origin: z.string(),
  state_of_residence: z.string(),
  title: z.string(),
});
export type IdentityBvnModel = z.infer<typeof IdentityBvnModelSchema>;

export const BillCategorySchema = z.object({
  name: z.string(),
  id: z.string(),
});

export type BillCategory = z.infer<typeof BillCategorySchema>;

export const BillCategoriesSchema = z.array(BillCategorySchema);

export type BillCategories = z.infer<typeof BillCategoriesSchema>;

export const BillCategoryListSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type BillCategoryList = z.infer<typeof BillCategoryListSchema>;

export const BillCategoryListsSchema = z.array(BillCategoryListSchema);

export type BillCategoryLists = z.infer<typeof BillCategoryListsSchema>;

export const BillCategoryListItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  code: z.string(),
  currency: z.string(),
  fee: z.number().optional(),
  amount: z.number().optional(),
});

export type BillCategoryListItem = z.infer<typeof BillCategoryListItemSchema>;

export const BillCategoryListItemsSchema = z.array(BillCategoryListItemSchema);

export type BillCategoryListItems = z.infer<typeof BillCategoryListItemsSchema>;

export const BillValidateCustomerBodySchema = z.object({
  biller_id: z.string(),
  item_id: z.string(),
  customer_id: z.string(),
  category: z.string(),
});

export type BillValidateCustomerBody = z.infer<
  typeof BillValidateCustomerBodySchema
>;

export const BillCreateBodySchema = z.object({
  biller_id: z.string(),
  customer_id: z.string(),
  category: z.string(),
  item_id: z.string(),
  reference: z.string().optional(),
  amount: z.number(),
});

export type BillCreateBody = z.infer<typeof BillCreateBodySchema>;

export const BillTransactionSchema = z.object({
  amount: z.number(),
  bill: z.object({
    bill_code: z.string(),
    bill_name: z.string(),
    item_code: z.string(),
    name: z.string(),
    token: z.string().optional(),
  }),
  category: z.string(),
  charges: z.number(),
  created_at: z.coerce.date(),
  detail: z.string(),
  fiat_rate: z.number(),
  id: z.string(),
  payment_method: z.string(),
  reference: z.string(),
  report: z.boolean(),
  report_message: z.string(),
  status: z.string(),
  type: z.string(),
  updated_at: z.coerce.date(),
});

export type BillTransaction = z.infer<typeof BillTransactionSchema>;

export const CreateBillTransactionSchema = z.object({
  transaction: BillTransactionSchema,
});

export type CreateBillTransaction = z.infer<typeof CreateBillTransactionSchema>;
