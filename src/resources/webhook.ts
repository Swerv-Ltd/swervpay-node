import { ApiClient } from "../apiClient";
import { SuccessResponse, SuccessResponseSchema } from "../types";

/**
 * Represents a Webhook resource.
 */
export class Webhook {
  #client: ApiClient;

  /**
   * Creates a new instance of the Webhook class.
   * @param client The API client used to make requests.
   */
  constructor(client: ApiClient) {
    this.#client = client;
  }

  /**
   * Tests the webhook with the specified ID.
   * @param id The ID of the webhook to test.
   * @returns A promise that resolves to a SuccessResponse object.
   */
  async test(id: string): Promise<SuccessResponse> {
    return this.#client.post<SuccessResponse>({
      path: `/webhooks/${id}/test`,
      body: {},
      schema: SuccessResponseSchema,
    });
  }

  /**
   * Retries the webhook with the specified ID.
   * @param id The ID of the webhook to retry.
   * @returns A promise that resolves to a SuccessResponse object.
   */
  async retry(id: string): Promise<SuccessResponse> {
    return this.#client.post<SuccessResponse>({
      path: `/webhooks/${id}/retry`,
      body: {},
      schema: SuccessResponseSchema,
    });
  }
}
