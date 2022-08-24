import { AxiosError, AxiosResponse } from "axios";

export class ApiErrorException {
  constructor(private error: AxiosError) {
    this.error = error;
    this.logError();
  }

  logError() {
    const { response } = this.error;
    const { data, status } = response as AxiosResponse;
    console.log({ status, reason: data.reason, errors: data.errors || [] });
  }
}
