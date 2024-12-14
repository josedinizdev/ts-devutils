export class List extends Array {
    constructor(...items) {
        super();
        this.push(...items);
    }
    binarySearch(element) {
        let low = 0;
        let high = this.length - 1;
        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            if (this[mid] === element) {
                return mid;
            }
            else if (this[mid] < element) {
                low = mid + 1;
            }
            else {
                high = mid - 1;
            }
        }
        return -1;
    }
    select(predicate) {
        return new List(...this.filter(predicate));
    }
    insert(index, element) {
        if (index >= 0 && index <= this.length) {
            this.splice(index, 0, element);
        }
    }
    remove(element) {
        const index = this.indexOf(element);
        if (index > -1) {
            return this.splice(index, 1)[0];
        }
        return undefined;
    }
    removeAt(index) {
        if (index >= 0 && index < this.length) {
            return this.splice(index, 1)[0];
        }
        return undefined;
    }
    removeRange(startIndex, count) {
        if (startIndex >= 0 && startIndex < this.length && count > 0) {
            return new List(...this.splice(startIndex, count));
        }
        return new List;
    }
    isEmpty() {
        return this.length === 0;
    }
    clear() {
        this.length = 0;
    }
    removeAll(predicate) {
        if (!predicate) {
            this.clear();
            return new List;
        }
        const removedElements = this.filter((element) => !predicate(element));
        this.length = 0;
        this.push(...removedElements);
        return new List(...removedElements);
    }
    aggregate(callback, initialValue) {
        let accumulator = initialValue;
        for (const value of this) {
            accumulator = callback(accumulator, value);
        }
        return accumulator;
    }
    chunk(size) {
        const chunks = [];
        for (let i = 0; i < this.length; i += size) {
            const chunk = new List(...this.slice(i, i + size));
            chunks.push(chunk);
        }
        return new List(...chunks);
    }
    exceptBy(otherList, keySelector) {
        const otherKeys = new Set(otherList.map(keySelector));
        return new List(...this.filter((value) => !otherKeys.has(keySelector(value))));
    }
    groupBy(keySelector) {
        const groups = new Map();
        for (const v of this) {
            const key = keySelector(v);
            const group = groups.get(key);
            if (group) {
                group.push(v);
            }
            else {
                let value = new List(v);
                groups.set(key, value);
            }
        }
        return groups;
    }
    groupJoin(otherList, keySelector, otherKeySelector, resultSelector) {
        const groups = otherList.groupBy(otherKeySelector);
        return new List(...this.map((value) => resultSelector(value, groups.get(keySelector(value)) || new List)));
    }
    joinFrom(otherList, keySelector, otherKeySelector, resultSelector) {
        const result = new List;
        for (const value1 of this) {
            for (const value2 of otherList) {
                if (keySelector(value1) === otherKeySelector(value2)) {
                    result.push(resultSelector(value1, value2));
                }
            }
        }
        return result;
    }
    selectMany(selector) {
        const result = new List;
        for (const value of this) {
            result.push(...selector(value));
        }
        return result;
    }
    sum(selector) {
        let sum = 0;
        for (const value of this) {
            if (typeof value != "number")
                return 0;
            const num = selector ? selector(value) : value;
            sum += num;
        }
        return sum;
    }
}
