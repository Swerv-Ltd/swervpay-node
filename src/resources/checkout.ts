import { ApiClient } from "../apiClient";
import {
  CreatePayoutResponse,
  CreatePayoutResponseSchema,
  CreditWalletBody,
  CreditWalletBodySchema,
} from "../types";

/**
 * Represents checkout operations.
 */
export class Checkout {
  #client: ApiClient;

  /**
   * Creates an instance of the Checkout class.
   * @param client - The API client.
   */
  constructor(client: ApiClient) {
    this.#client = client;
  }

  /**
   * Simulates a credit transaction for a checkout account. This endpoint is
   * available in the sandbox environment only.
   * @param accountNo - The checkout account number.
   * @param body - The credit transaction details.
   * @returns A promise that resolves to the created transaction reference.
   */
  async credit(
    accountNo: string,
    body: CreditWalletBody
  ): Promise<CreatePayoutResponse> {
    return CreditWalletBodySchema.parseAsync(body).then((payload) => {
      return this.#client.post<CreatePayoutResponse>({
        path: `/checkouts/${accountNo}/credit`,
        body: payload,
        schema: CreatePayoutResponseSchema,
      });
    });
  }
}
