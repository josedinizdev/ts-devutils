export function debounce(fn, wait, immediate) {
    let timeout;
    return (...args) => {
        const later = () => {
            timeout = null;
            if (!immediate) {
                fn(...args);
            }
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait || 200);
        if (callNow) {
            fn(...args);
        }
    };
}
