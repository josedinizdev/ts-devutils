export class List<T> extends Array<T> {

    constructor(...items: T[]) {
        super();
        this.push(...items);
    }

    public binarySearch(element: T): number {
        let low = 0;
        let high = this.length - 1;

        while (low <= high) {
            const mid = Math.floor((low + high) / 2);

            if (this[mid] === element) {
                return mid;
            } else if (this[mid] < element) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return -1;
    }

    public select(predicate: (value: T) => boolean): List<T> {
        return new List<T>(...this.filter(predicate));
    }

    public insert(index: number, element: T): void {
        if (index >= 0 && index <= this.length) {
            this.splice(index, 0, element);
        }
    }

    public remove(element: T): T | undefined {
        const index = this.indexOf(element);
        if (index > -1) {
            return this.splice(index, 1)[0];
        }
        return undefined;
    }

    public removeAt(index: number): T | undefined {
        if (index >= 0 && index < this.length) {
            return this.splice(index, 1)[0];
        }
        return undefined;
    }

    public removeRange(startIndex: number, count: number): List<T> {
        if (startIndex >= 0 && startIndex < this.length && count > 0) {
            return new List<T>(...this.splice(startIndex, count));
        }
        return new List;
    }

    public isEmpty(): boolean {
        return this.length === 0;
    }

    public clear(): void {
        this.length = 0;
    }

    public removeAll(predicate?: (value: T) => boolean): List<T> {
        if (!predicate) {
            this.clear();
            return new List<T>;
        }

        const removedElements = this.filter((element) => !predicate(element));
        this.length = 0;
        this.push(...removedElements);
        return new List(...removedElements);
    }

    public aggregate<U>(callback: (accumulator: U, value: T) => U, initialValue: U): U {
        let accumulator = initialValue;
        for (const value of this) {
            accumulator = callback(accumulator, value);
        }
        return accumulator;
    }

    public chunk(size: number): List<List<T>> {
        const chunks: List<T>[] = [];
        for (let i = 0; i < this.length; i += size) {
            const chunk = new List<T>(...this.slice(i, i + size));
            chunks.push(chunk);
        }
        return new List<List<T>>(...chunks);
    }

    public exceptBy<TKey>(otherList: List<T>, keySelector: (value: T) => TKey): List<T> {
        const otherKeys = new Set(otherList.map(keySelector));
        return new List<T>(...this.filter((value) => !otherKeys.has(keySelector(value))));
    }

    public groupBy<TKey>(keySelector: (value: T) => TKey): Map<TKey, List<T>> {
        const groups = new Map<TKey, List<T>>();
        for (const v of this) {
            const key = keySelector(v);
            const group = groups.get(key);
            if (group) {
                group.push(v);
            } else {
                let value: List<T> = new List<T>(v);
                groups.set(key, value);
            }
        }
        return groups;
    }

    public groupJoin<U, TKey, TResult>(
        otherList: List<U>,
        keySelector: (value: T) => TKey,
        otherKeySelector: (value: U) => TKey,
        resultSelector: (value: T, list: List<U>) => TResult
    ): List<TResult> {
        const groups = otherList.groupBy(otherKeySelector);
        return new List<TResult>(...this.map((value) => resultSelector(value, groups.get(keySelector(value)) || new List<U>)));
    }

    public joinFrom<U, TKey, TResult>(
        otherList: List<U>,
        keySelector: (value: T) => TKey,
        otherKeySelector: (value: U) => TKey,
        resultSelector: (value1: T, value2: U) => TResult
    ): List<TResult> {
        const result: List<TResult> = new List<TResult>;
        for (const value1 of this) {
            for (const value2 of otherList) {
                if (keySelector(value1) === otherKeySelector(value2)) {
                    result.push(resultSelector(value1, value2));
                }
            }
        }
        return result;
    }

    public selectMany<U>(selector: (value: T) => U[]): List<U> {
        const result: List<U> = new List<U>;
        for (const value of this) {
            result.push(...selector(value));
        }
        return result;
    }

    public sum(selector?: (value: T) => number): number {
        let sum = 0;
        for (const value of this) {
            if (typeof value != "number") return 0;
            const num = selector ? selector(value) : value as any;
            sum += num;
        }
        return sum;
    }
}