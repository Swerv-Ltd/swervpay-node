import { Logger } from "./logger";
import {
  AuthTokenModel,
  AuthTokenModelSchema,
  SwervpayClientOption,
} from "./types";
import { z } from "zod";

export class ApiClient {
  #logger: Logger;
  #options: SwervpayClientOption;
  #apiUrl: string;
  #accessToken: string | null;

  constructor(options: SwervpayClientOption) {
    this.#options = options;

    if (!this.#options.baseUrl) {
      this.#options.baseUrl = "https://app.swervpay.co/api/";
    }
    if (!this.#options.version) {
      this.#options.version = "v1";
    }
    this.#apiUrl = this.#options.baseUrl + this.#options.version;
    this.#logger = new Logger("swervpaydev", this.#options.logLevel);

    this.#logger.debug("API URL", { url: this.#apiUrl });

    if (this.#options.accessToken) {
      this.#accessToken = this.#options.accessToken;
    } else {
      this.#accessToken = null;

      // Get the access token
      new Promise((resolve, reject) => {
        this.fetchAccessToken()
          .then((token) => {
            this.#accessToken = token;
            resolve(token);
          })
          .catch((err) => {
            this.#logger.error("Error getting access token", { ...err });
            reject(err);
          });
      });
    }
  }

  setAccessToken(token: string) {
    this.#accessToken = token;
  }

  get getAccessToken() {
    return this.#accessToken;
  }

  async post<T = any>(options: {
    path: string;
    body: any;
    schema?: z.ZodType<T>;
  }): Promise<T> {
    return this.#request<T>({
      method: "POST",
      path: options.path,
      body: options.body,
    });
  }

  async get<T = any>(options: {
    path: string;
    query: any;
    schema?: z.ZodType<T>;
  }): Promise<T> {
    const query = new URLSearchParams(options.query).toString();

    const path = query ? `${options.path}?${query}` : options.path;

    return this.#request<T>({
      method: "GET",
      path: path,
      body: {},
    });
  }

  async put<T = any>(options: {
    path: string;
    body: any;
    schema?: z.ZodType<T>;
  }): Promise<T> {
    return this.#request<T>({
      method: "PUT",
      path: options.path,
      body: options.body,
    });
  }

  async delete<T = any>(options: {
    path: string;
    body: any;
    schema?: z.ZodType<T>;
  }): Promise<T> {
    return this.#request<T>({
      method: "DELETE",
      path: options.path,
      body: options.body,
    });
  }

  async #request<T = any>(options: {
    method: "POST" | "GET" | "PUT" | "DELETE" | "HEAD";
    path: string;
    body: any;
    headers?: any;
    schema?: z.ZodType<T>;
  }): Promise<T> {
    this.#logger.debug("Request data", {
      path: options.path,
      body: options.body,
      method: options.method,
    });

    let fullHeaders = {
      "Content-Type": "application/json",
      "User-Agent": "Swervpay/NodeJS-Sdk",
      Authorization:
        options.headers != undefined && options.headers["Authorization"] != null
          ? options.headers["Authorization"]
          : `Bearer ${this.#accessToken}`,
      ...options.headers,
    };

    const response = await fetch(`${this.#apiUrl}${options.path}`, {
      method: options.method,
      headers: fullHeaders,
      body:
        options.method == "GET" || options.method == "HEAD"
          ? undefined
          : JSON.stringify({
              ...options.body,
            }),
    });

    if ([200, 201].includes(response.status) == false) {
      const body = await response.json();

      this.#logger.error("Request error", {
        status: response.status,
        body: body,
      });

      throw body;
    }

    const data = await response.json();

    if (options.schema) {
      try {
        return options.schema.parse(data);
      } catch (error) {
        return data as T;
      }
    }

    return data as T;
  }

  async fetchAccessToken(): Promise<string> {
    const apiKey = getApiKey(this.#options.secretKey);

    if (apiKey.status === "invalid") {
      throw new Error("Invalid API key");
    } else if (apiKey.status === "missing") {
      throw new Error("Missing API key");
    }

    const res = await this.#request<AuthTokenModel>({
      method: "POST",
      path: "/auth",
      body: {},
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${this.#options.businessId}:${apiKey.apiKey}`
        ).toString("base64")}`,
      },
      schema: AuthTokenModelSchema,
    });

    return res.access_token;
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
