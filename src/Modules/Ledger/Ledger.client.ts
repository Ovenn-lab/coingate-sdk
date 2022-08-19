import { AbstractService } from "../Abstract/Abstract.service";
import { CoinGateClient } from "../Client/CoinGate.client";

export class LedgerClient extends CoinGateClient {
  private abstractService: AbstractService;

  constructor() {
    super();
    this.abstractService = new AbstractService();
  }

  public getAccount() {
    // GET
    // ledger/accounts/:id
  }

  public listAccounts() {
    // GET
    // ledger/accounts
  }
}
