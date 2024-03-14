import { ApiClient } from "../apiClient";
import {
  CollectionHistoryResponse,
  CollectionHistoryResponseSchema,
  CreateCollectionBody,
  CreateCollectionBodySchema,
  PageAndLimitQuery,
  WalletModel,
  WalletModelSchema,
} from "../types";

/**
 * Represents a Collection resource.
 */
export class Collection {
  #client: ApiClient;

  /**
   * Creates an instance of the Collection class.
   * @param client - The API client.
   */
  constructor(client: ApiClient) {
    this.#client = client;
  }

  /**
   * Retrieves a collection by its ID.
   * @param id - The ID of the collection.
   * @returns A promise that resolves with the collection data.
   */
  async get(id: string): Promise<WalletModel> {
    return this.#client.get<WalletModel>({
      path: `/collections/${id}`,
      query: {},
    });
  }

  /**
   * Retrieves multiple collections by their ID.
   * @param query - The query parameters for pagination.
   * @returns A promise that resolves with the collections data.
   */
  async gets(query: PageAndLimitQuery): Promise<WalletModel[]> {
    return this.#client.get<WalletModel[]>({
      path: `/collections`,
      query: query,
    });
  }

  /**
   * Retrieves a collection transaction by its ID & transaction id.
   * @param id - The ID of the collection.
   * @returns A promise that resolves with the collection history data.
   */
  async transaction(
    id: string,
    transactionId: string
  ): Promise<CollectionHistoryResponse> {
    return this.#client.get<CollectionHistoryResponse>({
      path: `/collections/${id}/transactions/${transactionId}`,
      query: {},
      schema: CollectionHistoryResponseSchema,
    });
  }

  /**
   * Retrieves collection transactions by their ID.
   * @param query - The query parameters for pagination.
   * @returns A promise that resolves with the collection transaction histories data.
   */
  async transactions(
    id: string,
    query: PageAndLimitQuery
  ): Promise<CollectionHistoryResponse[]> {
    return this.#client.get<CollectionHistoryResponse[]>({
      path: `/collections/${id}/transactions`,
      query: query,
    });
  }

  /**
   * Creates a new collection.
   * @param body - The collection data.
   * @returns A promise that resolves with the created collection data.
   */
  async create(body: CreateCollectionBody): Promise<WalletModel> {
    const payload = CreateCollectionBodySchema.safeParse(body);

    return this.#client.post<WalletModel>({
      path: `/collections/`,
      body: payload,
      schema: WalletModelSchema,
    });
  }
}
