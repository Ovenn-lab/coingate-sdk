import { AxiosInstance } from "axios";
import { CoinGateClient } from "../../Client/CoinGateClient";

export class AbstractService {
  public buildPath(path: string, pathEnd: string, params?: object) {
    if (!params) {
      return path;
    }
    path += pathEnd;
    for (const [key, value] of Object.entries(params)) {
      path = path.replace(`:${key}`, value);
    }
    console.log(path);
    return path;
  }
}
