export function getSafe<T = any, E = any>(onError?: E): any {
    return function (func: any): T | E |undefined {
        try {
            return func();
        } catch {
            return onError ?? undefined;
        }
    }
}