import { AxiosError, AxiosResponse } from "axios";

export const apiErrorException = (error: AxiosError) => {
  const { response } = error;
  const { data, status } = response as AxiosResponse;
  throw { status, reason: data.reason, errors: data.errors || [] };
};
