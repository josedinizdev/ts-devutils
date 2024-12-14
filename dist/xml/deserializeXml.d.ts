interface XmlOptions {
    arrayTags?: string[];
}
export declare function deserializeXml<T>(xml: string, masterKey?: string, options?: XmlOptions): T | undefined;
export {};
