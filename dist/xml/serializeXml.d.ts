export interface XmlOptions {
    encoding?: string;
    version?: string;
    xmlChild?: boolean;
    index?: number;
    firstIndexZero?: boolean;
}
export declare function serializeXml(rootTag: string, obj: any, options?: XmlOptions): string;
