import { AbstractService } from "../Abstract/Abstract.service";
import { CoinGateClient } from "../Client/CoinGate.client";

export class WithdrawalsClient extends CoinGateClient {
  private abstractService: AbstractService;

  constructor() {
    super();
    this.abstractService = new AbstractService();
  }

  public getWithdrawals() {
    // GET
    // withdrawals
  }

  public getWithdrawal() {
    // GET
    // withdrawals/:id
  }
}
