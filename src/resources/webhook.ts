import { ApiClient } from "../apiClient";
import {
  CreateWebhookBody,
  CreateWebhookBodySchema,
  SuccessResponse,
  SuccessResponseSchema,
  UpdateWebhookBody,
  UpdateWebhookBodySchema,
  WebhookLogModel,
  WebhookLogModelSchema,
  WebhookLogsQuery,
  WebhookLogsQuerySchema,
  WebhookModel,
  WebhookModelSchema,
} from "../types";

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
   * Creates a webhook.
   * @param body - The webhook URL, description, and subscribed events.
   * @returns A promise that resolves to the created webhook.
   */
  async create(body: CreateWebhookBody): Promise<WebhookModel> {
    return CreateWebhookBodySchema.parseAsync(body).then((payload) => {
      return this.#client.post<WebhookModel>({
        path: `/webhook`,
        body: payload,
        schema: WebhookModelSchema,
      });
    });
  }

  /**
   * Lists webhook delivery logs.
   * @param query - Optional pagination and filter parameters.
   * @returns A promise that resolves to the webhook logs.
   */
  async logs(query: WebhookLogsQuery = {}): Promise<WebhookLogModel[]> {
    return WebhookLogsQuerySchema.parseAsync(query).then((value) => {
      return this.#client.get<WebhookLogModel[]>({
        path: `/webhook/logs`,
        query: value,
        schema: WebhookLogModelSchema.array(),
      });
    });
  }

  /**
   * Updates a webhook.
   * @param id - The ID of the webhook.
   * @param body - The webhook fields to update.
   * @returns A promise that resolves when the webhook is updated.
   */
  async update(
    id: string,
    body: UpdateWebhookBody
  ): Promise<SuccessResponse> {
    return UpdateWebhookBodySchema.parseAsync(body).then((payload) => {
      return this.#client.put<SuccessResponse>({
        path: `/webhook/${id}`,
        body: payload,
        schema: SuccessResponseSchema,
      });
    });
  }

  /**
   * Tests the webhook with the specified ID.
   * @param id The ID of the webhook to test.
   * @returns A promise that resolves to a SuccessResponse object.
   */
  async test(id: string): Promise<SuccessResponse> {
    return this.#client.post<SuccessResponse>({
      path: `/webhook/${id}/test`,
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
      path: `/webhook/log/${id}/retry`,
      body: {},
      schema: SuccessResponseSchema,
    });
  }
}
