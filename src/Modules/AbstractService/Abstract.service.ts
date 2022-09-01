import { BuildPathInput } from './types';
export class AbstractService {
  protected buildPath({ path, pathEnd, params }: BuildPathInput) {
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        path = `${path + pathEnd || ''}`.replace(`:${key}`, value);
      }
    }

    return path;
  }
}
