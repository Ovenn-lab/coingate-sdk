import { BuildPathInput } from './types';
export class AbstractService {
  protected buildPath({ path, pathEnd, params }: BuildPathInput) {
    if (params) {
      path += pathEnd || '';
      for (const [key, value] of Object.entries(params)) {
        path = path.replace(`:${key}`, value);
      }
    }
    console.log(path);
    return path;
  }
}
