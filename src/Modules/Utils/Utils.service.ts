import { BuildPathInput } from "./types";
export class AbstractService {
  // Reiks refactor poto sita methoda

  protected buildPath({ path, pathEnd, params }: BuildPathInput) {
    if (!params) {
      return path;
    }
    path += pathEnd || "";
    for (const [key, value] of Object.entries(params)) {
      path = path.replace(`:${key}`, value);
    }
    console.log(path);
    return path;
  }
}
