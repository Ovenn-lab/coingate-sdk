export declare enum EnviromentEnum {
    LIVE = "live",
    SANDBOX = "sandbox"
}
export declare type ConfigType = {
    apiKey: string | null;
    enviroment: EnviromentEnum;
    apiBase: string;
};
export declare type AppInfo = {
    name: string;
    version?: string;
};
