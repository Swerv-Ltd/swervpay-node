import { ApiClient } from "../apiClient";
import {
  IdentityBvnBody,
  IdentityBvnBodySchema,
  IdentityBvnModel,
  IdentityBvnModelSchema,
} from "../types";

/**
 * Represents a class for interacting with identity resources.
 */
export class Identity {
  #client: ApiClient;

  /**
   * Creates an instance of the Other class.
   * @param client - The API client to use for making requests.
   */
  constructor(client: ApiClient) {
    this.#client = client;
  }

  /**
   * BVN verification
   * @param body - The request body containing the bvn number.
   * @returns {Promise<IdentityBvnModel>} A promise that resolves to the bvn information.
   */
  async bvn(body: IdentityBvnBody): Promise<IdentityBvnModel> {
    return IdentityBvnBodySchema.parseAsync(body).then((payload) => {
      return this.#client.post<IdentityBvnModel>({
        path: `/identity/bvn`,
        body: payload,
        schema: IdentityBvnModelSchema,
      });
    });
  }
}
