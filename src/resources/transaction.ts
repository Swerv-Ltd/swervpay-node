import { ApiClient } from "../apiClient";
import { PageAndLimitQuery, TransactionModel } from "../types";

/**
 * Represents a transaction resource.
 */
export class Transaction {
  #client: ApiClient;

  /**
   * Creates an instance of Transaction.
   * @param {ApiClient} client - The API client.
   */
  constructor(client: ApiClient) {
    this.#client = client;
  }

  /**
   * Retrieves a transaction by its ID.
   * @param {string} id - The ID of the transaction.
   * @returns {Promise<TransactionModel>} - A promise that resolves with the transaction data.
   */
  async get(id: string): Promise<TransactionModel> {
    return this.#client.get<TransactionModel>({
      path: `/transactions/${id}`,
      query: {},
    });
  }

  /**
   * Retrieves a list of transactions based on the provided query parameters.
   * @param {Object} query - The query parameters for filtering and pagination.
   * @param {number} query.page - The page number.
   * @param {number} query.limit - The maximum number of transactions per page.
   * @returns {Promise<TransactionModel[]>} - A promise that resolves with the list of transactions.
   */
  async gets(query: PageAndLimitQuery): Promise<TransactionModel[]> {
    return this.#client.get<TransactionModel[]>({
      path: `/transactions`,
      query: query,
    });
  }
}
