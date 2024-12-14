type CurrencyOptions = {
    currency?: Intl.LocalesArgument;
    beginWith?: string;
    endWith?: string;
    padRight?: number;
    pattern?: RegExp | String;
    callback?: (arg: number | string) => number | string;
};
export declare function currency(nmb: number | string, options?: CurrencyOptions): number | string | undefined;
export {};
