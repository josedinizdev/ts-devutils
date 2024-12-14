export declare class List<T> extends Array<T> {
    constructor(...items: T[]);
    binarySearch(element: T): number;
    select(predicate: (value: T) => boolean): List<T>;
    insert(index: number, element: T): void;
    remove(element: T): T | undefined;
    removeAt(index: number): T | undefined;
    removeRange(startIndex: number, count: number): List<T>;
    isEmpty(): boolean;
    clear(): void;
    removeAll(predicate?: (value: T) => boolean): List<T>;
    aggregate<U>(callback: (accumulator: U, value: T) => U, initialValue: U): U;
    chunk(size: number): List<List<T>>;
    exceptBy<TKey>(otherList: List<T>, keySelector: (value: T) => TKey): List<T>;
    groupBy<TKey>(keySelector: (value: T) => TKey): Map<TKey, List<T>>;
    groupJoin<U, TKey, TResult>(otherList: List<U>, keySelector: (value: T) => TKey, otherKeySelector: (value: U) => TKey, resultSelector: (value: T, list: List<U>) => TResult): List<TResult>;
    joinFrom<U, TKey, TResult>(otherList: List<U>, keySelector: (value: T) => TKey, otherKeySelector: (value: U) => TKey, resultSelector: (value1: T, value2: U) => TResult): List<TResult>;
    selectMany<U>(selector: (value: T) => U[]): List<U>;
    sum(selector?: (value: T) => number): number;
}
