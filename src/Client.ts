import { BaseClient } from './BaseClient';

export class Client extends BaseClient {
  constructor(
    protected apiKey: string | null,
    protected useSandboxEnv?: boolean
  ) {
    super(apiKey, useSandboxEnv);
  }

  // public get(){}

  // public call() {}
}
