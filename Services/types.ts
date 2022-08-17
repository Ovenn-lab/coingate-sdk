export enum RequestEnum {
  GET = "get",
  POST = "post",
}

export type getRequestData = {
  apiKey?: string;
  path: string;
  params?: object;
};
