import { ApiClient } from "../apiClient";
import {
  CreateCustomerBody,
  CreateCustomerSchema,
  CustomerKycBody,
  CustomerModel,
  CustomerModelSchema,
  PageAndLimitQuery,
  SuccessResponse,
  SuccessResponseSchema,
  UpdateCustomerBody,
} from "../types";

/**
 * Represents a customer resource.
 */
export class Customer {
  #client: ApiClient;

  /**
   * Creates an instance of the Customer class.
   * @param client - The API client used to make requests.
   */
  constructor(client: ApiClient) {
    this.#client = client;
  }

  /**
   * Retrieves a customer by ID.
   * @param id - The ID of the customer to retrieve.
   * @returns A promise that resolves to the customer data.
   */
  async get(id: string): Promise<CustomerModel> {
    return this.#client.get<CustomerModel>({
      path: `/customers/${id}`,
      query: {},
      schema: CustomerModelSchema,
    });
  }

  /**
   * Retrieves a list of customers.
   * @param query - The query parameters for pagination (page and limit).
   * @returns A promise that resolves to an array of customers.
   */
  async gets(query: PageAndLimitQuery): Promise<CustomerModel[]> {
    return this.#client.get<CustomerModel[]>({
      path: `/customers`,
      query: query,
    });
  }

  /**
   * Creates a new customer.
   * @param body - The customer data.
   * @returns A promise that resolves to the created customer data.
   */
  async create(body: CreateCustomerBody): Promise<CustomerModel> {
    const payload = CreateCustomerSchema.safeParse(body);
    return this.#client.post<CustomerModel>({
      path: `/customers/`,
      body: payload,
      schema: CustomerModelSchema,
    });
  }

  /**
   * Updates an existing customer.
   * @param id - The ID of the customer to update.
   * @param body - The updated customer data.
   * @returns A promise that resolves to the updated customer data.
   */
  async update(id: string, body: UpdateCustomerBody): Promise<SuccessResponse> {
    return this.#client.post<SuccessResponse>({
      path: `/customers/${id}/update`,
      body: body,
      schema: SuccessResponseSchema,
    });
  }

  /**
   * Performs KYC (Know Your Customer) verification for a customer.
   * @param id - The ID of the customer to perform KYC for.
   * @param body - The KYC data.
   * @returns A promise that resolves to the KYC result.
   */
  async kyc(id: string, body: CustomerKycBody): Promise<SuccessResponse> {
    return this.#client.post<SuccessResponse>({
      path: `/customers/${id}/kyc`,
      body: body,
      schema: SuccessResponseSchema,
    });
  }

  /**
   * Blacklists a customer.
   * @param id - The ID of the customer to blacklist.
   * @returns A promise that resolves when the customer is blacklisted.
   */
  async blacklist(id: string): Promise<SuccessResponse> {
    return this.#client.post<SuccessResponse>({
      path: `/customers/${id}/blacklist`,
      body: {},
      schema: SuccessResponseSchema,
    });
  }
}
