window.$ = function (nodeSelector) {
    if (!nodeSelector) return null;
    return document.querySelector(nodeSelector);
};

window.$$ = (nodeSelector) => {
    if (!nodeSelector) return [];
    return document.querySelectorAll(nodeSelector);
};

window.patchZeroForNumber = (num) => {
    if (typeof num !== 'number') return '';
    const newNum = num < 10 ? `0${num}` : num;
    return newNum;
}

window.current = (isTime = false) => {
    const currentDate = new Date();
    if (isTime) return currentDate.getTime();
    const M = currentDate.getMonth() + 1;
    const D = currentDate.getDate();
    const h = currentDate.getHours();
    const m = currentDate.getMinutes();
    const s = currentDate.getSeconds();
    const ms = currentDate.getMilliseconds();
    let CURRENT_DATE = {};
    let current_date_properties = ['M_', 'D_', 'h_', 'm_', 's_', 'ms_'];
    ([M, D, h, m, s, ms].map((d, i) => window.patchZeroForNumber(d))).map((d, i) => {
        CURRENT_DATE[current_date_properties[i]] = d;
    });
    const { M_, D_, h_, m_, s_, ms_ } = CURRENT_DATE;
    return `<span class="printer-timer"> ~${M_}-${D_} ${h_}:${m_}:${s_}.${ms_}</span>`;
}
