import { z } from "zod";

const SwyftpayClientOption = z.object({
  businessId: z.string(),
  secretKey: z.string(),
  sandbox: z.boolean().default(false),
  timeout: z.number().default(30000),
  version: z.string().default("v1"),
  baseUrl: z.string().default("https://swyftpay.com/api"),
});

export type SwyftpayClientOption = z.infer<typeof SwyftpayClientOption>;
