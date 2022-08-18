import { AbstractService } from "../Abstract/Abstract.service";
import { CoinGateClient } from "../Client/CoinGate.client";

export class ApiApplicationsClient extends CoinGateClient {
  private abstractService: AbstractService;

  constructor() {
    super();
    this.abstractService = new AbstractService();
  }

  public getApplications() {
    // GET
    // apps
  }

  public getApplication() {
    // GET
    // apps/:id
  }

  public createApplication() {
    // POST
    // apps
  }

  public editApplication() {
    // PATCH
    // apps/:id
  }
}
