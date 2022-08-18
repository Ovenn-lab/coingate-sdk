import { PublicService } from "./Modules/Public/Public.service";

const app = new PublicService();

app.getExchangeRate({ from: "EUR", to: "EUR" });
// app.getCurrencies({
//   native: true,
//   enabled: true,
//   merchant_pay: true,
//   merchant_receive: true,
//   kind: "crypto",
// });
// app.platforms();
