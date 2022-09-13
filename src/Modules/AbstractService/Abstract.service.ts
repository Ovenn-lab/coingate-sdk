import { BuildPathInput } from './types';

export class AbstractService {
  protected buildPath({ path, params }: BuildPathInput) {
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        path = path.replace(`:${key}`, value);
      }
    }

    return path;
  }
}
