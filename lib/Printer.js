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

export default Printer;