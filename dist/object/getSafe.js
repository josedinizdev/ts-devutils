export function getSafe(onError) {
    return function (func) {
        try {
            return func();
        }
        catch {
            return onError ?? undefined;
        }
    };
}
