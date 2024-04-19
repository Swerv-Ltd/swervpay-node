import { ApiClient } from "./apiClient";
import { Business } from "./resources/business";
import { Card } from "./resources/card";
import { Collection } from "./resources/collection";
import { Customer } from "./resources/customer";
import { Fx } from "./resources/fx";
import { Other } from "./resources/other";
import { Payout } from "./resources/payout";
import { Transaction } from "./resources/transaction";
import { Wallet } from "./resources/wallet";
import { Webhook } from "./resources/webhook";
import { SwervpayClientOption } from "./types";

/**
 * Represents a client for interacting with the Swervpay API.
 */
export class SwervpayClient {
  #apiClient: ApiClient;
  #card: Card;
  #customer: Customer;
  #transaction: Transaction;
  #payout: Payout;
  #fx: Fx;
  #other: Other;
  #wallet: Wallet;
  #webhook: Webhook;
  #business: Business;
  #collection: Collection;

  constructor(options: SwervpayClientOption) {
    this.#apiClient = new ApiClient(options);

    this.#card = new Card(this.#apiClient);
    this.#customer = new Customer(this.#apiClient);
    this.#transaction = new Transaction(this.#apiClient);
    this.#payout = new Payout(this.#apiClient);
    this.#fx = new Fx(this.#apiClient);
    this.#other = new Other(this.#apiClient);
    this.#wallet = new Wallet(this.#apiClient);
    this.#webhook = new Webhook(this.#apiClient);
    this.#business = new Business(this.#apiClient);
    this.#collection = new Collection(this.#apiClient);
  }

  /**
   * Gets the api client.
   *
   * @returns The ApiClient.
   */
  get client(): ApiClient {
    return this.#apiClient;
  }

  /**
   * Gets the business.
   *
   * @returns The Business.
   */
  get business(): Business {
    return this.#business;
  }

  /**
   * Gets the card.
   *
   * @returns The Card.
   */
  get card(): Card {
    return this.#card;
  }

  /**
   * Gets the customer.
   *
   * @returns The Customer.
   */
  get customer(): Customer {
    return this.#customer;
  }

  /**
   * Gets the transaction.
   *
   * @returns The Transaction.
   */
  get transaction(): Transaction {
    return this.#transaction;
  }

  /**
   * Gets the payout.
   *
   * @returns The Payout.
   */
  get payout(): Payout {
    return this.#payout;
  }

  /**
   * Gets the fx.
   *
   * @returns The Fx.
   */
  get fx(): Fx {
    return this.#fx;
  }

  /**
   * Gets the other.
   *
   * @returns The Other.
   */
  get other(): Other {
    return this.#other;
  }

  /**
   * Gets the wallet.
   *
   * @returns The Wallet.
   */
  get wallet(): Wallet {
    return this.#wallet;
  }

  /**
   * Gets the webhook.
   *
   * @returns The webhook.
   */
  get webhook(): Webhook {
    return this.#webhook;
  }

  /**
   * Gets the collection.
   *
   * @returns The Collection.
   */

  get collection(): Collection {
    return this.#collection;
  }
}
