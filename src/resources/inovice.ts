import { ApiClient } from "../apiClient";
import {
  CreateInvoiceBody,
  CreateInvoiceBodySchema,
  InvoiceModel,
  InvoiceModelSchema,
  PageAndLimitQuery,
  UpdateInvoiceBody,
  UpdateInvoiceBodySchema,
} from "../types";

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

  /**
   * Retrieves a list of invoices.
   * @param query - The pagination parameters.
   * @returns A promise that resolves to the invoices.
   */
  async gets(query: PageAndLimitQuery): Promise<InvoiceModel[]> {
    return this.#client.get<InvoiceModel[]>({
      path: `/invoices`,
      query,
      schema: InvoiceModelSchema.array(),
    });
  }

  /**
   * Creates an invoice.
   * @param body - The invoice data.
   * @returns A promise that resolves to the created invoice.
   */
  async create(body: CreateInvoiceBody): Promise<InvoiceModel> {
    return CreateInvoiceBodySchema.parseAsync(body).then((payload) => {
      return this.#client.post<InvoiceModel>({
        path: `/invoices`,
        body: payload,
        schema: InvoiceModelSchema,
      });
    });
  }

  /**
   * Retrieves an invoice by ID.
   * @param id - The ID of the invoice.
   * @returns A promise that resolves to the invoice.
   */
  async get(id: string): Promise<InvoiceModel> {
    return this.#client.get<InvoiceModel>({
      path: `/invoices/${id}`,
      query: {},
      schema: InvoiceModelSchema,
    });
  }

  /**
   * Updates an invoice.
   * @param id - The ID of the invoice.
   * @param body - The fields to update.
   * @returns A promise that resolves to the updated invoice.
   */
  async update(id: string, body: UpdateInvoiceBody): Promise<InvoiceModel> {
    return UpdateInvoiceBodySchema.parseAsync(body).then((payload) => {
      return this.#client.post<InvoiceModel>({
        path: `/invoices/${id}`,
        body: payload,
        schema: InvoiceModelSchema,
      });
    });
  }
}
