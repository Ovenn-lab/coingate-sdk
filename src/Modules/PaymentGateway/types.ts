export type ListOrdersData = {
  per_page?: number;
  page?: number;
  sort?: 'created_at_asc' | 'created_at_desc';
  from?: string;
  to?: string;
};

export type CreateOrderBody = {
  order_id?: string;
  price_amount: number;
  price_currency: string;
  receive_currency: string;
  title?: string;
  description?: string;
  callback_url?: string;
  cancel_url?: string;
  success_url?: string;
  token?: string;
  purchaser_email?: string;
};

export type CheckoutBody = {
  pay_currency: string;
  lightning_network?: boolean;
  purchaser_email?: string;
  platform_id?: string;
};

export type PaymentParamType = {
  id: number;
};
