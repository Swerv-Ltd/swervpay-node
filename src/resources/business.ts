import { ApiClient } from "../apiClient";
import { BusinessModel } from "../types";

/**
 * Represents a business resource.
 */
export class Business {
  #client: ApiClient;

  /**
   * Creates a new instance of the Business class.
   * @param client The API client used to make requests.
   */
  constructor(client: ApiClient) {
    this.#client = client;
  }

  /**
   * Retrieves the business information.
   * @returns A Promise that resolves to the business data.
   */
  async get(): Promise<BusinessModel> {
    return this.#client.get<BusinessModel>({
      path: `/business`,
      query: {},
    });
  }
}
