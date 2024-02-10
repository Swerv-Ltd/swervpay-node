import { ApiClient } from "../apiClient";

export class Fx {
  #client: ApiClient;

  constructor(client: ApiClient) {
    this.#client = client;
  }

  async rate(body: {}) {
    return this.#client.post({
      path: `/customers/`,
      body: body,
    });
  }

  async exchange(body: {}) {
    return this.#client.post({
      path: `/customers/`,
      body: body,
    });
  }
}
