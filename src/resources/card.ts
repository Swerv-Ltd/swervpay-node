import { ApiClient } from "../apiClient";
import {
  CardModel,
  CreateCardBody,
  CreateCardResponse,
  CreateCardResponseSchema,
  FundOrWithdrawCardBody,
  PageAndLimitQuery,
  SuccessResponse,
  SuccessResponseSchema,
} from "../types";

/**
 * Represents a Card resource.
 */
export class Card {
  #client: ApiClient;

  /**
   * Creates an instance of the Card class.
   * @param client - The API client.
   */
  constructor(client: ApiClient) {
    this.#client = client;
  }

  /**
   * Retrieves a card by its ID.
   * @param id - The ID of the card.
   * @returns A promise that resolves with the card data.
   */
  async get(id: string): Promise<CardModel> {
    return this.#client.get<CardModel>({
      path: `/cards/${id}`,
      query: {},
    });
  }

  /**
   * Retrieves multiple cards by their ID.
   * @param query - The query parameters for pagination.
   * @returns A promise that resolves with the card data.
   */
  async gets(query: PageAndLimitQuery): Promise<CardModel[]> {
    return this.#client.get<CardModel[]>({
      path: `/cards`,
      query: query,
    });
  }

  /**
   * Creates a new card.
   * @param body - The card data.
   * @returns A promise that resolves with the created card data.
   */
  async create(body: CreateCardBody): Promise<CreateCardResponse> {
    return this.#client.post<CreateCardResponse>({
      path: `/cards/`,
      body: body,
      schema: CreateCardResponseSchema,
    });
  }

  /**
   * Freezes a card by its ID.
   * @param id - The ID of the card.
   * @returns A promise that resolves when the card is frozen.
   */
  async freeze(id: string): Promise<SuccessResponse> {
    return this.#client.post<SuccessResponse>({
      path: `/cards/${id}/freeze`,
      body: {},
      schema: SuccessResponseSchema,
    });
  }

  /**
   * Terminates a card by its ID.
   * @param id - The ID of the card.
   * @returns A promise that resolves when the card is terminated.
   */
  async terminate(id: string): Promise<SuccessResponse> {
    return this.#client.post<SuccessResponse>({
      path: `/cards/${id}/terminate`,
      body: {},
      schema: SuccessResponseSchema,
    });
  }

  /**
   * Funds a card by its ID.
   * @param id - The ID of the card.
   * @returns A promise that resolves when the card is funded.
   */
  async fund(
    id: string,
    body: FundOrWithdrawCardBody
  ): Promise<SuccessResponse> {
    return this.#client.post<SuccessResponse>({
      path: `/cards/${id}/fund`,
      body: body,
      schema: SuccessResponseSchema,
    });
  }

  /**
   * Withdraws funds from a card by its ID.
   * @param id - The ID of the card.
   * @returns A promise that resolves when the funds are withdrawn.
   */
  async withdraw(
    id: string,
    body: FundOrWithdrawCardBody
  ): Promise<SuccessResponse> {
    return this.#client.post<SuccessResponse>({
      path: `/cards/${id}/withdraw`,
      body: body,
      schema: SuccessResponseSchema,
    });
  }
}
