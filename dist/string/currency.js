export function currency(nmb, options) {
    if (typeof nmb != "number" || Number.isNaN(nmb))
        return;
    if (!options?.currency && !options?.padRight && !options?.callback)
        return nmb;
    let resp = nmb;
    if (options?.currency) {
        const splitter = 0.1.toLocaleString(options.currency).split('.').length > 1 ? '.' : ',';
        resp = nmb.toLocaleString(options.currency);
        if (options.padRight && options.padRight > 0)
            resp = resp.split(splitter).map((v, i) => {
                if (i == 0)
                    return v;
                else if (options.padRight && options.padRight > v.length)
                    return v.padEnd(options.padRight ?? v.length, '0');
                return v;
            }).join(splitter);
    }
    if (options?.beginWith)
        resp = options.beginWith + resp;
    if (options?.endWith)
        resp = resp + options.endWith;
    if (options?.callback) {
        const callbackResp = options.callback(resp);
        if (typeof callbackResp == "number" || typeof callbackResp == "string")
            resp = callbackResp;
    }
    if (options?.pattern instanceof RegExp)
        if (!options?.pattern.test(resp.toString()))
            return;
    return resp;
}
