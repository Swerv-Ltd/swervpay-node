import { ApiClient } from "../apiClient";
import { CreatePayoutBody, SuccessResponse, TransactionModel } from "../types";

/**
 * Represents a Payout resource.
 */
export class Payout {
  #client: ApiClient;

  /**
   * Creates a new instance of the Payout class.
   * @param client The API client used to make requests.
   */
  constructor(client: ApiClient) {
    this.#client = client;
  }

  /**
   * Creates a new payout.
   * @param body The payout data.
   * @returns {Promise<SuccessResponse>} A promise that resolves to the created payout.
   */
  async create(body: CreatePayoutBody): Promise<SuccessResponse> {
    return this.#client.post<SuccessResponse>({
      path: `/payouts`,
      body: body,
    });
  }

  /**
   * Retrieves a payout by its ID.
   * @param id The ID of the payout to retrieve.
   * @returns {Promise<TransactionModel>} A promise that resolves to the retrieved payout data.
   */
  async get(id: string): Promise<TransactionModel> {
    return this.#client.get<TransactionModel>({
      path: `/payouts/${id}`,
      query: {},
    });
  }
}
