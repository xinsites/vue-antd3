// 打印插件

//ie 打印预览控件
const ieWebBrowser = '<object id="WebBrowser" classid="clsid:1EF81ED1-5055-422F-B287-5D7180F8967E" width="0" height="0"></object>';
const printFrameId = 'xin-printer-frame';       // iframe窗口id
const printStyleId = 'xin-printer-style';       // 全局样式id
const printDirectionId = 'xin-printer-set';     //方向设置id
const loadingElId = 'xin-printer-loading';      //加载层id
const printingClass = 'xin-printer-printing';   //正在打印标识class
const hideClass = 'xin-printer-hide';           //打印时隐藏的class
const hideNoneClass = 'xin-printer-hide-none';  //打印时隐藏不占位置的class

function uuid(length = 8) {
    const num = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    let str = 'p_';
    for (let i = 0; i < length; i++) {
        str += num.charAt(Math.floor(Math.random() * num.length));
    }
    return str;
}

function isIE() {
    return !!window['ActiveXObject'] || 'ActiveXObject' in window;
}

function getPrintFrame() {
    const pFrame = document.getElementById(printFrameId);
    if (pFrame && pFrame.parentNode) {
        pFrame.parentNode.removeChild(pFrame);
    }
    const iframeEl = document.createElement('iframe');
    iframeEl.id = printFrameId;
    Object.assign(iframeEl.style, {
        width: '0px',
        height: '0px',
        position: 'fixed',
        visibility: 'hidden'
    });
    document.body.appendChild(iframeEl);
    iframeEl.focus();
    return iframeEl;
}

function getCommonCss(isPrinting = false) {
    return `
    @media print {
      html, body {
        padding: 0;
        margin: 0;
      }
    }

    /* 打印时背景色设置 */
    @media print {
    body{
      -webkit-print-color-adjust:exact;
      -moz-print-color-adjust:exact;
      -ms-print-color-adjust:exact;
      print-color-adjust:exact;
    } 
    /* 打印时不显示的元素 */
    .${hideClass}.${printingClass} {
      visibility: hidden !important;
    }
    .${hideClass} {
      ${isPrinting ? 'visibility: hidden !important;' : ''}
    }
    .${hideClass}.${printingClass}.${hideNoneClass},
    .${hideClass}.${hideNoneClass}${isPrinting ? '' : '-no'} {
      display: none !important;
    }

    /* 表格样式 */
    .xin-printer-table {
      width: 100%;
      border-collapse: collapse;
      border: none;
    }
    .xin-printer-table td, .xin-printer-table th {
      color: #333;
      padding: 9px 15px;
      border: 1px solid #333;
      word-break: break-all;
    }

    /* loading 样式 */
    #${loadingElId} {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: hsla(0, 0%, 100%, .9);
      z-index: 19000000;
    }
    #${loadingElId}:after {
      content: "";
      width: 40px;
      height: 40px;
      position: absolute;
      top: 50%;
      left: 50%;
      margin: -20px auto auto -20px;
      border: 2px solid #3296FA;
      border-right-color: transparent;
      border-bottom-color: transparent;
      border-radius: 50%;
      animation: xin-printer-loading-anim .8s linear infinite;
    }
    @keyframes xin-printer-loading-anim {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    /* 带页眉页脚页面样式 */
    .xin-printer-table-page {
      width: 100%;
      border-collapse: collapse;
      border: none;
    }
    .xin-printer-table-page td {
      padding: 0;
      border: none;
    }
  `;
}

function getPageStyleHtml(padding?: string | number, width?: string | number, height?: string | number) {
    return `
    <style>
      body {
        margin: 0 !important;
      }

      /* 自定义边距及宽高样式 */
      .xin-printer-page .xin-printer-page-item {
        width: ${width ?? 'auto'};
        height: ${height ?? 'auto'};
        padding: ${padding ?? '0'};
        page-break-after: always !important;
        box-sizing: border-box !important;
        border: none !important;
        position: relative;
      }

      /* 调试模式样式 */
      .xin-printer-page.xin-printer-debug .xin-printer-page-item {
        border: 1px solid red !important;
      }

      /* 全局样式 */
      ${getCommonCss(true)}
    </style>
  `;
}

function getOptionHtml(config) {
    const {beforeJs, doneJs} = addCallback(config.before, config.done);
    const blank = config.blank || (config.iePreview !== false && isIE());
    const closeJs = blank && config.close !== false ? 'window.close();' : '';
    const hideLoadJs = 'parent.hideElePrinterLoading&&parent.hideElePrinterLoading();';
    const optHtml = [];
    optHtml.push(`<style type="text/css" media="print" id="${printDirectionId}">`);
    optHtml.push('@page {');
    if (typeof config.horizontal !== 'undefined') {
        optHtml.push(`size: ${config.horizontal ? 'landscape' : 'portrait'};`);
    }
    if (config.margin != null) {
        optHtml.push(`margin: ${config.margin};`);
    }
    optHtml.push(`}`);
    optHtml.push(`</style>`);
    if (config.iePreview !== false && isIE()) {
        optHtml.push(ieWebBrowser);
        if (config.print !== false) {
            optHtml.push(`
        <script>
          window.onload = function() {
            ${beforeJs}
            try {
              window.WebBrowser.ExecWB(7, 1);
            } catch(e) {
              console.error(e);
              window.print();
            }
            ${hideLoadJs}
            ${doneJs}
            ${closeJs}
          }
        </script>
      `);
        }
    } else if (config.print !== false) {
        optHtml.push(`
      <script>
        window.onload = function() {
          ${beforeJs}
          window.print();
          ${hideLoadJs}
          ${doneJs}
          ${closeJs}
        }
      </script>
    `);
    }
    return optHtml.join('');
}

function addCommonCss() {
    if (!document.getElementById(printStyleId)) {
        const styleEl = document.createElement('style');
        styleEl.id = printStyleId;
        styleEl.setAttribute('type', 'text/css');
        styleEl.innerHTML = getCommonCss();
        document.body.appendChild(styleEl);
    }
}

function addHeaderFooter(html, header, footer) {
    if (!header && !footer) {
        return html ?? '';
    }
    let result = '<table class="xin-printer-table-page">';
    if (header) {
        result += `<thead><tr><td>${header}</td></tr></thead>`;
    }
    result += `<tbody><tr><td>${html ?? ''}</td></tr></tbody>`;
    if (footer) {
        result += `<tfoot><tr><td>${footer}</td></tr></tfoot>`;
    }
    return result + '</table>';
}

function addCallback(before, done) {
    const taskId = 'p' + uuid();
    window['elePrinterBefore'] = window['elePrinterBefore'] || {};
    window['elePrinterDone'] = window['elePrinterDone'] || {};
    if (before) {
        window['elePrinterBefore'][taskId] = before;
    }
    if (done) {
        window['elePrinterDone'][taskId] = done;
    }
    const beforeJs = `;parent.elePrinterBefore&&parent.elePrinterBefore.${taskId}&&parent.elePrinterBefore.${taskId}();`;
    const doneJs = `;parent.elePrinterDone&&parent.elePrinterDone.${taskId}&&parent.elePrinterDone.${taskId}();`;
    return {taskId, beforeJs, doneJs};
}

function hideElem(els?: string | HTMLElement | Array<string | HTMLElement>, isNone?: boolean) {
    Array.from(document.getElementsByClassName(hideClass)).forEach(hideEl => {
        hideEl?.classList.add(printingClass);
    });
    if (!els) {
        return;
    }
    const isArray = Array.isArray(els) || els instanceof NodeList || els instanceof HTMLCollection;
    // @ts-ignore
    Array.from(isArray ? els : [els]).forEach(el => {
        if (typeof el === 'string') {
            document.querySelectorAll(el).forEach(element => {
                element?.classList.add(hideClass, printingClass);
                if (isNone) {
                    element.classList.add(hideNoneClass);
                }
            });
        } else if (el?.classList) {
            el.classList.add(hideClass, printingClass);
            if (isNone) {
                el.classList.add(hideNoneClass);
            }
        }
    });
}

function showElem(els?: string | HTMLElement | Array<string | HTMLElement>) {
    Array.from(document.getElementsByClassName(hideClass)).forEach(hideEl => {
        hideEl?.classList.remove(printingClass);
    });
    if (!els) {
        return;
    }
    const isArray = Array.isArray(els) || els instanceof NodeList || els instanceof HTMLCollection;
    // @ts-ignore
    Array.from(isArray ? els : [els]).forEach(el => {
        if (typeof el === 'string') {
            document.querySelectorAll(el).forEach(element => {
                element?.classList.remove(hideClass, printingClass, hideNoneClass);
            });
        } else if (el?.classList) {
            el.classList.remove(hideClass, printingClass, hideNoneClass);
        }
    });
}

function showLoading() {
    addCommonCss();
    let loadEl = document.getElementById(loadingElId);
    if (!loadEl) {
        loadEl = document.createElement('div');
        loadEl.id = loadingElId;
        document.body.appendChild(loadEl);
    }
    loadEl.style.display = 'block';
    window['hideElePrinterLoading'] = hideLoading;
    return loadEl;
}

function hideLoading() {
    const loadEl = document.getElementById(loadingElId);
    if (loadEl) {
        loadEl.style.display = 'none';
    }
}

/**
 * 打印参数
 */
export interface PrintConfig {
    hide?: string | HTMLElement | Array<string | HTMLElement>;
    horizontal?: boolean;
    iePreview?: boolean;
    blank?: boolean;
    close?: boolean;
    margin?: string | number;
    title?: string;
    isHideNone?: boolean;
}

/**
 * 打印任意内容参数
 */
export interface PrintHtmlConfig extends PrintConfig {
    html?: string;
    print?: boolean;
    loading?: boolean;
    header?: string;
    footer?: string;
    before?: () => void;
    done?: () => void;
    style?: string;
}

/**
 * 分页打印参数
 */
export interface PrintPageConfig extends PrintHtmlConfig {
    pages?: string[];
    padding?: string | number;
    width?: string | number;
    height?: string | number;
    isDebug?: boolean;
}

/**
 * pdf 打印参数
 */
export interface PrintPdfConfig {
    url?: string;
    arraybuffer?: ArrayBuffer;
    loading?: boolean;
    before?: () => void;
    done?: () => void;
    error?: (status: number, result: string) => void;
}

/**
 * 生成表格列参数配置
 */
export interface ColConfig<T> {
    INIT_OK?: boolean;
    key?: string;
    parentKey?: string;
    colGroup?: boolean;
    HAS_PARENT?: boolean;
    PARENT_COL_INDEX?: number;
    CHILD_COLS?: ColConfig<T>[];
    field?: string;
    title?: string;
    width?: number;
    align?: string;
    thAlign?: string;
    style?: string;
    thStyle?: string;
    colspan?: number;
    rowspan?: number;
    templet?: (d: T, index?: number, colIndex?: number) => any;
}

/**
 * 打印当前页面
 * @param config 参数配置
 */
function printCurPage(config: PrintConfig): Window | null {
    window.focus();
    addCommonCss();
    const optElem = document.getElementById(printDirectionId);
    if (optElem && optElem.parentNode) {
        optElem.parentNode.removeChild(optElem);
    }
    const optStr = [];
    if (typeof config.horizontal === 'boolean') {
        optStr.push(`size: ${config.horizontal ? 'landscape' : 'portrait'};`);
    }
    if (config.margin != null) {
        optStr.push(`margin: ${config.margin};`);
    }
    if (optStr) {
        const styleEl = document.createElement('style');
        styleEl.id = printDirectionId;
        styleEl.setAttribute('type', 'text/css');
        styleEl.setAttribute('media', 'print');
        styleEl.innerHTML = `@page { ${optStr.join('')} }`;
        document.body.appendChild(styleEl);
    }
    hideElem(config.hide, config.isHideNone);
    const oldTitle = document.title;
    if (config.title) {
        document.title = config.title;
    }
    let pWin;
    if (!config.blank) {
        pWin = window;
        if (config.iePreview !== false && isIE()) {
            if (!document.getElementById('WebBrowser')) {
                const objectEl = document.createElement('object');
                objectEl.id = 'WebBrowser';
                objectEl.setAttribute('classid', 'clsid:1EF81ED1-5055-422F-B287-5D7180F8967E');
                objectEl.style.display = 'none';
                document.body.appendChild(objectEl);
            }
            try {
                window['WebBrowser'].ExecWB(7, 1);
            } catch (e) {
                console.error(e);
                pWin.print();
            }
        } else {
            pWin.print();
        }
    } else {
        pWin = window.open('', '_blank');
        if (pWin) {
            pWin.focus();
            const pDoc = pWin.document;
            if (pDoc) {
                pDoc.open();
                let html = '<!DOCTYPE html>' + (document.getElementsByTagName('html')[0]?.outerHTML ?? '');
                html = html.replace(/<script/g, '<div style="display:none;" ').replace(/<\/script>/g, '</div>');
                const addHtml = function (str) {
                    html = html.replace(/<\/html>/, `${str}</html>`);
                };
                if (config.iePreview !== false && isIE()) {
                    if (!document.getElementById('WebBrowser')) {
                        addHtml(ieWebBrowser);
                    }
                    addHtml(`
          <script>
            window.onload = function() {
              try {
                window.WebBrowser.ExecWB(7,1);
              } catch(e) {
                console.error(e);
                window.print();
              }
              ${config.close !== false ? 'window.close();' : ''}
            }
          </script>
          `);
                } else {
                    addHtml(`
          <script>
            window.onload = function() {
              window.print();
              ${config.close !== false ? 'window.close();' : ''}
            }
          </script>
          `);
                }
                pDoc.write(html);
                pDoc.close();
            }
        }
    }
    if (config.title) {
        document.title = oldTitle;
    }
    showElem(config.hide);
    return pWin;
}

/**
 * 打印任意内容
 * @param config PrintHtmlConfig
 */
function printAnyHtml(config: PrintHtmlConfig): Window | null {
    if (config.loading !== false && config.blank !== true) {
        showLoading();
    }
    let pWin, pDoc;
    if (config.blank || (config.iePreview !== false && isIE())) {
        pWin = window.open('', '_blank');
        pDoc = pWin?.document;
    } else {
        const pFrame = getPrintFrame();
        pWin = pFrame.contentWindow;
        pDoc = pFrame.contentDocument || pWin?.document;
    }

    const htmlStyles = [];
    const linkStyles = [];
    Array.from(document.head.children).forEach(el => {
        if (el.tagName.toLowerCase() === 'style') {
            htmlStyles.push(el.innerHTML);
        }
        if (el.tagName.toLowerCase() === 'link' && el.outerHTML?.toLowerCase().includes('.css')) {
            linkStyles.push(el.outerHTML);
        }
    });

    if (pWin) {
        pWin.focus();
        if (pDoc && config.html) {
            pDoc.open();
            pDoc.write(`
        <!DOCTYPE html>
        <head>
          <meta charset="UTF-8"/>
          <title>${config.title ?? ''}</title>
          ${linkStyles.join('\n\r')}
          <style>
            ${htmlStyles.join(' ')}
          </style>
          <style>
            ${getCommonCss(true)}
          </style>
          ${config.style ?? ''}
        </head>
        <html>
        <body>
          ${addHeaderFooter(config.html, config.header, config.footer)}
          ${getOptionHtml(config)}
        </body>
        </html>
      `);
            pDoc.close();
        }
    }
    return pWin;
}

/**
 * 分页打印
 * @param config PrintPageConfig
 */
function printPagesHtml(config: PrintPageConfig): Window | null {
    if (config.loading !== false && config.blank !== true) {
        showLoading();
    }
    let pWin, pDoc;
    if (config.blank || (config.iePreview !== false && isIE())) {
        pWin = window.open('', '_blank');
        pDoc = pWin?.document;
    } else {
        const pFrame = getPrintFrame();
        pWin = pFrame.contentWindow;
        pDoc = pFrame.contentDocument || pWin?.document;
    }
    if (pWin && pDoc) {
        pWin.focus();
        const content = config.pages?.map(h => `<div class="xin-printer-page-item">${h}</div>`).join('') ?? '';
        const pageClass = 'xin-printer-page' + (config.isDebug ? ' xin-printer-debug' : '');
        const contentHtml = `<div class="${pageClass}">${content}</div>`;
        pDoc.open();
        pDoc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8"/>
          <title>${config.title ?? ''}</title>
          ${getPageStyleHtml(config.padding, config.width, config.height)}
          ${config.style ?? ''}
        </head>
        <body>
        ${addHeaderFooter(contentHtml, config.header, config.footer)}
        ${getOptionHtml(config)}
        </body>
      </html>
    `);
        pDoc.close();
    }
    return pWin;
}

/**
 * 打印 pdf
 * @param config PrintPdfConfig
 */
function printPdf(config: PrintPdfConfig): Window | null {
    if (config.loading !== false) {
        showLoading();
    }
    const pFrame = getPrintFrame();
    const pWin = pFrame.contentWindow;
    pFrame.onload = () => {
        if (!pFrame.getAttribute('src')) {
            return;
        }
        pFrame.focus();
        config.before?.();
        pWin?.print();
        hideLoading();
        config.done?.();
    };

    function doPrint(arraybuffer) {
        const localPdf = new window.Blob([arraybuffer], {
            type: 'application/pdf',
        });
        if (window.navigator && window.navigator['msSaveOrOpenBlob']) {
            window.navigator['msSaveOrOpenBlob'](localPdf, 'print.pdf');
            hideLoading();
        } else {
            pFrame.setAttribute('src', window.URL.createObjectURL(localPdf));
        }
    }

    if (config.arraybuffer) {
        doPrint(config.arraybuffer);
    } else if (config.url) {
        const req = new window.XMLHttpRequest();
        req.open('GET', config.url, true);
        req.responseType = 'arraybuffer';
        req.onload = () => {
            if (![200, 201].includes(req.status)) {
                return config.error?.(req.status, req.statusText);
            }
            doPrint(req.response);
        };
        req.send();
    }
    return pWin;
}

/**
 * 生成表格 html
 * @param data 数据
 * @param cols 列配置
 */
function buildTableHtml<T>(data: T[], cols: Array<ColConfig<T>[]>): string {
    cols.forEach(col => {
        col.forEach(c => {
            c.INIT_OK = undefined;
            c.key = undefined;
            c.colGroup = undefined;
            c.HAS_PARENT = undefined;
            c.parentKey = undefined;
            c.PARENT_COL_INDEX = undefined;
        });
    });
    const colArrays = [];
    let colIndex = 0;
    for (let i1 = 0; i1 < cols.length; i1++) {
        const item1 = cols[i1];
        for (let i2 = 0; i2 < item1.length; i2++) {
            const item2 = item1[i2];
            if (!item2) {
                item1.splice(i2, 1);
                continue;
            }
            item2.key = `${i1}-${i2}`;
            let CHILD_COLS = undefined;
            if (item2.colGroup || (item2.colspan && item2.colspan > 1)) {
                item2.colGroup = true;
                CHILD_COLS = [];
                colIndex++;
                let childIndex = 0;
                for (let i22 = 0; i22 < cols[i1 + 1].length; i22++) {
                    const item22 = {...cols[i1 + 1][i22]};
                    if (item22.HAS_PARENT || (childIndex > 1 && childIndex === item2.colspan)) {
                        cols[i1 + 1][i22] = item22;
                        continue;
                    }
                    item22.HAS_PARENT = true;
                    item22.parentKey = `${i1}-${i2}`;
                    item22.key = `${i1 + 1}-${i22}`;
                    item22.PARENT_COL_INDEX = colIndex;
                    CHILD_COLS.push(item22);
                    childIndex += Number(item22.colspan && item22.colspan > 1 ? item22.colspan : 1);
                    cols[i1 + 1][i22] = item22;
                }
            }
            item2.CHILD_COLS = CHILD_COLS;
            if (!item2.PARENT_COL_INDEX) {
                colArrays.push(item2);
            }
            cols[i1][i2] = item2;
        }
    }
    const eachCols = function (callback, arr) {
        if (!arr) {
            arr = colArrays;
        }
        for (let i = 0; i < arr.length; i++) {
            const item = arr[i];
            callback?.(i, item);
            if (item.CHILD_COLS) {
                eachCols(callback, item.CHILD_COLS);
            }
        }
    };
    let maxWidth = 1;
    let needSetWidth = true;
    const colgroupHtml = [];
    // @ts-ignore
    eachCols((index, item) => {
        if (!item.colGroup) {
            colgroupHtml.push('<col');
            if (item.width) {
                colgroupHtml.push(` width="${item.width}"`);
            }
            colgroupHtml.push('/>');
            if (item.width && !/\d+%$/.test(String(item.width))) {
                maxWidth += item.width + 1;
            } else {
                needSetWidth = false;
            }
        }
    });
    const thHtml = cols
        .map(cs => {
            const th = cs
                .map(item => {
                    return `<th
                    colspan="${item.colspan || 1}"
                    rowspan="${item.rowspan || 1}"
                    align="${item.thAlign || item.align || 'left'}"
                    style="${item.thStyle}">${item.title || ''}
                  </th>`;
                })
                .join('');
            return '<tr>' + th + '</tr>';
        })
        .join('');
    const headHtml = '<thead>' + thHtml + '</thead>';
    const trHtml = data
        .map((d, index) => {
            const tr = ['<tr>'];
            let colIndex2 = 0;
            // @ts-ignore
            eachCols((index, item) => {
                if (!item.colGroup) {
                    const value = item.field ? d[item.field] : '';
                    const content = item.templet ? item.templet(d, index, colIndex2) : value;
                    const align = item.align || 'left';
                    tr.push(`<td align="${align}" style="${item.style}">${content}</td>`);
                    colIndex2++;
                }
            });
            tr.push('</tr>');
            return tr.join('');
        })
        .join('');
    const bodyHtml = '<tbody>' + trHtml + '</tbody>';
    return `<table
            style="width: ${needSetWidth ? maxWidth + 'px' : '100%'};"
            class="xin-printer-table">
            <colgroup>${colgroupHtml.join('')}</colgroup>
            ${headHtml} ${bodyHtml}
          </table>`;
}

/**
 * 打印指定区域
 * @param el HTMLElement
 * @param config 参数配置
 */
function printEleHtml(el?: HTMLElement | null, config?: PrintConfig): Window | null {
    if (!el) {
        return null;
    }
    const bodyChilds = Array.from(document.body.children).filter(el => {
        return !['style', 'script', 'link'].includes(el.tagName.toLowerCase());
    });
    // @ts-ignore
    hideElem(bodyChilds, true);
    const parntEl = el.parentNode;
    const nextEl = el.nextElementSibling;
    document.body.append(el);
    const pWin = printCurPage(config);
    if (nextEl) {
        parntEl?.insertBefore(el, nextEl);
    } else {
        parntEl?.append(el);
    }
    // @ts-ignore
    showElem(bodyChilds);
    return pWin;
}

export {buildTableHtml, printEleHtml, printAnyHtml, printPagesHtml, printPdf, printCurPage};
