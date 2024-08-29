import { ApiClient } from "../apiClient";

/**
 * Represents a class for interacting with identity resources.
 */
export class Invoice {
  #client: ApiClient;

  /**
   * Creates an instance of the Other class.
   * @param client - The API client to use for making requests.
   */
  constructor(client: ApiClient) {
    this.#client = client;
  }
}
