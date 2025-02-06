import { ApiClient } from "../apiClient";
import {
  SuccessResponse,
  SuccessResponseSchema,
  BillCategories,
  BillCategoriesSchema,
  BillCategoryListsSchema,
  BillCategoryLists,
  BillCategoryListItems,
  BillCategoryListItemsSchema,
  BillValidateCustomerBody,
  BillValidateCustomerBodySchema,
  BillCreateBody,
  BillCreateBodySchema,
  BillTransaction,
  BillTransactionSchema,
} from "../types";

/**
 * Represents a Bill resource.
 */
export class Bill {
  #client: ApiClient;

  /**
   * Creates an instance of the Bill class.
   * @param client - The API client.
   */
  constructor(client: ApiClient) {
    this.#client = client;
  }

  /**
   * Retrieves available bill categories.
   * @returns A promise that resolves with the list of bill categories.
   */
  async categories(): Promise<BillCategories> {
    return this.#client.get<BillCategories>({
      path: `/bills/categories`,
      query: {},
      schema: BillCategoriesSchema,
    });
  }

  /**
   * Retrieves the list of billers for a specific category.
   * @param name - The name of the bill category.
   * @returns A promise that resolves with the list of billers.
   */
  async category_list(name: string): Promise<BillCategoryLists> {
    return this.#client.get<BillCategoryLists>({
      path: `/bills/categories/${name}`,
      query: {},
      schema: BillCategoryListsSchema,
    });
  }

  /**
   * Retrieves the available items/products for a specific biller in a category.
   * @param name - The name of the bill category.
   * @param biller_id - The ID of the biller.
   * @returns A promise that resolves with the list of items.
   */
  async category_items(
    name: string,
    biller_id: string
  ): Promise<BillCategoryListItems> {
    return this.#client.get<BillCategoryListItems>({
      path: `/bills/categories/${name}/items/${biller_id}`,
      query: {},
      schema: BillCategoryListItemsSchema,
    });
  }

  /**
   * Validates a customer's details for bill payment.
   * @param payload - The customer validation details.
   * @returns A promise that resolves with the validation response.
   */
  async validate_customer(
    payload: BillValidateCustomerBody
  ): Promise<SuccessResponse> {
    return BillValidateCustomerBodySchema.parseAsync(payload).then((value) => {
      return this.#client.post<SuccessResponse>({
        path: `/bills/validate`,
        body: value,
        schema: SuccessResponseSchema,
      });
    });
  }

  /**
   * Creates a new bill payment transaction.
   * @param payload - The bill payment details.
   * @returns A promise that resolves with the created bill transaction.
   */
  async create(payload: BillCreateBody): Promise<BillTransaction> {
    return BillCreateBodySchema.parseAsync(payload).then((value) => {
      return this.#client.post<BillTransaction>({
        path: `/bills`,
        body: value,
        schema: BillTransactionSchema,
      });
    });
  }

  /**
   * Retrieves a bill transaction by its ID.
   * @param id - The ID of the bill transaction.
   * @returns A promise that resolves with the bill transaction data.
   */
  async get(id: string): Promise<BillTransaction> {
    return this.#client.get<BillTransaction>({
      path: `/bills/${id}`,
      query: {},
      schema: BillTransactionSchema,
    });
  }
}
