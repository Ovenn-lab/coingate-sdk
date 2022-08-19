export enum RequestEnum {
  GET = "get",
  POST = "post",
}

export type getRequestData = {
  path: string;
  params?: object;
};
