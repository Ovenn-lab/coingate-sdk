import { BuildPathInput } from './types';
export declare class AbstractService {
    protected buildPath({ path, params }: BuildPathInput): string;
    protected validateApiKey(apiKey: string | null): void;
}
