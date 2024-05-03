import { ApiClient } from "../apiClient";
import {
  CreatePayoutBody,
  CreatePayoutBodySchema,
  CreatePayoutResponse,
  CreatePayoutResponseSchema,
  TransactionModel,
  TransactionModelSchema,
} from "../types";

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
   * @returns {Promise<CreatePayoutResponse>} A promise that resolves to the created payout.
   */
  async create(body: CreatePayoutBody): Promise<CreatePayoutResponse> {
    return CreatePayoutBodySchema.parseAsync(body).then((value) => {
      return this.#client.post<CreatePayoutResponse>({
        path: `/payouts`,
        body: value,
        schema: CreatePayoutResponseSchema,
      });
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
      schema: TransactionModelSchema,
    });
  }
}
