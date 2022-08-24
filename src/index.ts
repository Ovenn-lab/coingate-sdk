import { Client } from "./Clients";

const client = new Client(
  "Bearer P_gkiNVtFZkNy1kCekx6fdwsfCT-dWL21tsxrHh_",
  true
);

// "Bearer P_gkiNVtFZkNy1kCekx6fdwsfCT-dWL21tsxrHh_",
//   "sandbox"

// client.paymentGateway.checkout(32800, { pay_currency: "ETH" });
// client.paymentGateway.listOrders();

// client.paymentGateway.getOrder(32810);

const test = async () => {
  const test = await client.refunds.createOrderRefund(32820, {
    amount: 50,
    address: "2MxRdYGDdyFiqkMUUksTJ3Qey8sTQPfTii9",
    currency_id: 1,
    platform_id: 2,
    reason: "for test purposes",
    email: "testDrive@gmail.com",
    ledger_account_id: "random",
  });
  // const test = await client.public.getExchangeRate({ from: "EUR", to: "EUR" });
  console.log(test);
};
test();
// client.paymentGateway.createOrder({
//   price_amount: 150.5,
//   price_currency: "EUR",
//   receive_currency: "GBP",
// });

// app.getExchangeRate({ from: "EUR", to: "EUR" });
// app.getCurrencies({
//   native: true,
//   enabled: true,
//   merchant_pay: true,
//   merchant_receive: true,
//   kind: "crypto",
// });
// app.platforms();
