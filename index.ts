import { PublicService } from "./Modules/Public/Public.service";

const app = new PublicService();

app.getExchangeRate({ from: "EUR", to: "EUR" });
