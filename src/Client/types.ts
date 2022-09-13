export type GetRequestType = {
  path: string;
  params?: object;
  apiKey?: string;
};

export type HeadersType = {
  'Content-Type'?: string;
  Authorization?: string;
  'User-Agent'?: string;
};
