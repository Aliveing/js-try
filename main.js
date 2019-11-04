function $ (nodeSelector) {
    if (!nodeSelector) return null;
    return document.querySelector(nodeSelector);
}
function $$ (nodeSelector){
    if (!nodeSelector) return [];
    return document.querySelectorAll(nodeSelector);
}

function patchZeroForNumber(num) {
    if (typeof num !== 'number') return '';
    const newNum = num < 10 ? `0${num}` : num;
    return newNum;
}

function current(isTime = false) {
    const currentDate = new Date();
    if(isTime) return currentDate.getTime();
    const M = currentDate.getMonth() + 1;
    const D = currentDate.getDate();
    const h = currentDate.getHours();
    const m = currentDate.getMinutes();
    const s = currentDate.getSeconds();
    const ms = currentDate.getMilliseconds();
    let CURRENT_DATE = {};
    let current_date_properties = ['M_', 'D_', 'h_', 'm_', 's_', 'ms_'];
    ([M, D, h, m, s, ms].map((d, i) => patchZeroForNumber(d))).map((d, i) => {
        CURRENT_DATE[current_date_properties[i]] = d;
    });
    const { M_, D_, h_, m_, s_, ms_ } = CURRENT_DATE;
    return `<span class="printer-timer"> ~${M_}-${D_} ${h_}:${m_}:${s_}.${ms_}</span>`;
}

class Printer{

    constructor(fileName) {
        this._file_name = fileName || 'global';
        Printer.addFileName(fileName);
    }

    static _FILE_NAMES = [];

    static addFileName = (fileName) => {
        const isAlreadyExists = Printer._FILE_NAMES.includes(fileName);
        if (!isAlreadyExists) {
            Printer._FILE_NAMES.push(fileName);
        }
    };

    appendTitle(printer, title) {
        const contentTitle = document.createElement('div');
        contentTitle.id = title;
        contentTitle.className = 'printer-item';
        contentTitle.innerHTML = `
            <div class="printer-title">${title}.js</div>
            <div class="printer-content"></div>
        `;
        printer.appendChild(contentTitle);
    }

    getCurrentContentDiv = (printerOrigin) => {
        const file_name = this._file_name;
        const printer = $(`#printer > div#${file_name}`);
        if (!printer) {
            this.appendTitle(printerOrigin, `${file_name}`);
        }
        const content = $(`#printer > div#${file_name} > div.printer-content`);
        return content;
    }

    print = (message) => {
        const me = this;
        const printerOrigin = $('#printer');
        if (!printerOrigin) {
            console.warn('can\'t find printer div, please check div#printer is inner body tag');
            return;
        }
        const printerContent = me.getCurrentContentDiv(printerOrigin);
        const content = document.createElement('div');
        content.className = 'printer-content-item';
        content.innerHTML = `<div class="printer-content-item-inner">${message}</div> ${current()}`;
        printerContent.appendChild(content);
    }
}
