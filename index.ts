import { PublicClient } from "./Modules/Public/Public.client";

const app = new PublicClient();

app.getExchangeRate({ from: "EUR", to: "EUR" });
// app.getCurrencies({
//   native: true,
//   enabled: true,
//   merchant_pay: true,
//   merchant_receive: true,
//   kind: "crypto",
// });
// app.platforms();
