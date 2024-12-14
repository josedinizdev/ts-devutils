export function debounce(fn: (...args: any[]) => void, wait: number, immediate?: boolean): (...args: any[]) => void {
    let timeout: NodeJS.Timeout | null;

    return (...args: any[]): void => {
        const later = (): void => {
            timeout = null;
            if (!immediate) {
                fn(...args);
            }
        };

        const callNow = immediate && !timeout;
        clearTimeout(timeout!);
        timeout = setTimeout(later, wait || 200);

        if (callNow) {
            fn(...args);
        }
    };
}
