import { AxiosError, AxiosResponse } from "axios";

export class ApiErrorException {
  protected reason: string | null = null;

  protected errors: string[] = [];

  protected httpStatus: number | null = null;

  constructor(private message: string) {}

  public static factory(response: AxiosResponse, status: number) {
    const {
      data: { reason, errors, message },
    } = response;
    const instance = new this(message || null);
    instance.setReason(reason);
    instance.setErrorDetails(errors);
    instance.setHttpStatus(status);
    console.log(instance);
    return instance;
  }

  public setReason(reason: string | null): string | null {
    this.reason = reason;
    return this.reason;
  }
  public getReason(): string | null {
    return this.reason;
  }

  public setErrorDetails(errors: string[]): string[] {
    this.errors = errors;

    return this.errors;
  }
  public getErrorDetails(): string[] {
    return this.errors;
  }

  public setHttpStatus(status: number | null): number | null {
    this.httpStatus = status;
    return this.httpStatus;
  }

  public getHttpStatus(): number | null {
    return this.httpStatus;
  }
}
