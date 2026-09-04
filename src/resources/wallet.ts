import { ApiClient } from "../apiClient";
import {
  CreatePayoutResponse,
  CreatePayoutResponseSchema,
  CreditWalletBody,
  CreditWalletBodySchema,
  PageAndLimitQuery,
  WalletModel,
  WalletModelSchema,
} from "../types";

/**
 * Represents a Wallet resource.
 */
export class Wallet {
  #client: ApiClient;

  /**
   * Creates a new instance of the Wallet class.
   * @param client The API client used to make requests.
   */
  constructor(client: ApiClient) {
    this.#client = client;
  }

  /**
   * Retrieves a wallet by its ID.
   * @param id The ID of the wallet to retrieve.
   * @returns {Promise<WalletModel>} A Promise that resolves to the retrieved wallet data.
   */
  async get(id: string): Promise<WalletModel> {
    return this.#client.get<WalletModel>({
      path: `/wallets/${id}`,
      query: {},
      schema: WalletModelSchema,
    });
  }

  /**
   * Retrieves a list of wallets based on the provided query parameters.
   * @param query The query parameters for filtering and pagination.
   * @returns {Promise<WalletModel[]>} A Promise that resolves to an array of wallets.
   */
  async gets(query: PageAndLimitQuery): Promise<WalletModel[]> {
    return this.#client.get<WalletModel[]>({
      path: `/wallets`,
      query: query,
    });
  }

  /**
   * Simulates a credit transaction for a wallet. This endpoint is available
   * in the sandbox environment only.
   * @param id - The ID of the wallet.
   * @param body - The credit transaction details.
   * @returns A promise that resolves to the created transaction reference.
   */
  async credit(
    id: string,
    body: CreditWalletBody
  ): Promise<CreatePayoutResponse> {
    return CreditWalletBodySchema.parseAsync(body).then((payload) => {
      return this.#client.post<CreatePayoutResponse>({
        path: `/wallets/${id}/credit`,
        body: payload,
        schema: CreatePayoutResponseSchema,
      });
    });
  }
}
