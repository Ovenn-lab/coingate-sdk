import { InvalidArgumentException } from '#Exception';

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

  protected validateApiKey(apiKey: string) {
    if (apiKey !== null) {
      if (typeof apiKey !== 'string') {
        throw new InvalidArgumentException('apiKey must be null or a string');
      }

      if (apiKey.length === 0) {
        throw new InvalidArgumentException('apiKey cannot be empty string');
      }

      if (/\s/.test(apiKey)) {
        throw new InvalidArgumentException('apiKey cannot contain whitespace');
      }
    }
  }
}
