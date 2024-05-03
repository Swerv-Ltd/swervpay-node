import { ApiClient } from "../apiClient";
import {
  ExchangeRateResponse,
  ExchangeRateResponseSchema,
  FxBody,
  FxBodySchema,
  TransactionModel,
  TransactionModelSchema,
} from "../types";

/**
 * Represents a class for handling foreign exchange operations.
 */
export class Fx {
  #client: ApiClient;

  /**
   * Creates an instance of the Fx class.
   * @param client The API client used for making requests.
   */
  constructor(client: ApiClient) {
    this.#client = client;
  }

  /**
   * Retrieves the exchange rate for the specified currency pair.
   * @param body The request body containing the currency pair.
   * @returns A promise that resolves to the exchange rate.
   */
  async rate(body: FxBody): Promise<ExchangeRateResponse> {
    return FxBodySchema.parseAsync(body).then((payload) => {
      return this.#client.post<ExchangeRateResponse>({
        path: `/fx/rate`,
        body: payload,
        schema: ExchangeRateResponseSchema,
      });
    });
  }

  /**
   * Performs a currency exchange operation.
   * @param body The request body containing the exchange details.
   * @returns A promise that resolves to the transaction model.
   */
  async exchange(body: FxBody): Promise<TransactionModel> {
    return FxBodySchema.parseAsync(body).then((payload) => {
      return this.#client.post<TransactionModel>({
        path: `/fx/exchange`,
        body: payload,
        schema: TransactionModelSchema,
      });
    });
  }
}
