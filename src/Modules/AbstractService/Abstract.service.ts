import { BuildPathInput } from './types';

export class AbstractService {
  protected buildPath({ path, params }: BuildPathInput) {
    let newPath = path;
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        newPath = newPath.replace(`:${key}`, value);
      }
    }

    return newPath;
  }
}
