import { ApiClient } from "../apiClient";
import { BankModel, ResolveAccountBody, ResolveAccountModel } from "../types";

/**
 * Represents a class for interacting with other resources.
 */
export class Other {
  #client: ApiClient;

  /**
   * Creates an instance of the Other class.
   * @param client - The API client to use for making requests.
   */
  constructor(client: ApiClient) {
    this.#client = client;
  }

  /**
   * Retrieves a list of banks.
   * @returns {Promise<BankModel[]>} A promise that resolves to the list of banks.
   */
  async banks(): Promise<BankModel[]> {
    return this.#client.get<BankModel[]>({
      path: `/banks`,
      query: {},
    });
  }

  /**
   * Resolves an account number.
   * @param body - The request body containing the account number.
   * @returns {Promise<ResolveAccountModel>} A promise that resolves to the resolved account information.
   */
  async resolve_account_number(
    body: ResolveAccountBody
  ): Promise<ResolveAccountModel> {
    return this.#client.post<ResolveAccountModel>({
      path: `/resolve-account-number`,
      body: body,
    });
  }
}
