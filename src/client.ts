import { SwyftpayClientOption } from "./types";

export class SwyftpayClient {
  #options: SwyftpayClientOption;

  constructor(options: SwyftpayClientOption) {
    this.#options = options;
  }
}
