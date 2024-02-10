import { Logger } from "./logger";
import { SwervpayClientOption } from "./types";

export class ApiClient {
  #logger: Logger;
  #options: SwervpayClientOption;
  #apiUrl: string;
  constructor(options: SwervpayClientOption) {
    this.#options = options;
    this.#apiUrl = this.#options.baseUrl + this.#options.version;
    this.#logger = new Logger("swervpaydev", this.#options.logLevel);
  }

  async post<T = any>(options: { path: string; body: any }): Promise<T> {
    return this.request<T>({
      method: "POST",
      path: options.path,
      body: options.body,
    });
  }

  async get<T = any>(options: { path: string; query: any }): Promise<T> {
    const query = new URLSearchParams(options.query).toString();

    const path = query ? `${options.path}?${query}` : options.path;

    return this.request<T>({
      method: "GET",
      path: path,
      body: {},
    });
  }

  async put<T = any>(options: { path: string; body: any }): Promise<T> {
    return this.request<T>({
      method: "PUT",
      path: options.path,
      body: options.body,
    });
  }

  async delete<T = any>(options: { path: string; body: any }): Promise<T> {
    return this.request<T>({
      method: "DELETE",
      path: options.path,
      body: options.body,
    });
  }

  async request<T = any>(options: {
    method: "POST" | "GET" | "PUT" | "DELETE";
    path: string;
    body: any;
  }): Promise<T> {
    const apiKey = await this.#apiKey();

    this.#logger.debug("Request data", {
      path: options.path,
      body: options.body,
      method: options.method,
    });

    const response = await fetch(`${this.#apiUrl}/${options.path}`, {
      method: options.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        ...options.body,
      }),
    });

    if (response.status !== 200 && response.status !== 201) {
      const body = await response.json();

      throw new Error(body as any);
    }

    return (await response.json()) as T;
  }

  async #apiKey() {
    const apiKey = getApiKey(this.#options.secretKey);

    if (apiKey.status === "invalid") {
      throw new Error("Invalid API key");
    } else if (apiKey.status === "missing") {
      throw new Error("Missing API key");
    }

    return apiKey.apiKey;
  }
}

function getApiKey(key?: string) {
  const apiKey = key;

  if (!apiKey) {
    return { status: "missing" as const };
  }

  // Validate the api_key format (should be tr_{env}_XXXXX)
  const isValid = apiKey.match(/^sk_[a-z]+_[a-zA-Z0-9]+$/);

  if (!isValid) {
    return { status: "invalid" as const, apiKey };
  }

  return { status: "valid" as const, apiKey };
}
