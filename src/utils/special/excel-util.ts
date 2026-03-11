import {read, utils, writeFile} from 'xlsx';
import {message} from 'ant-design-vue';
import {RuleProps, RuleTitleProps, validateRecordCell} from "xin-antd3-ui";

/**
 * 根据Excel文件，获取二维数组、json
 */
export async function readerExcel(file: File, sheetName: String) {
    return new Promise(function (resolve, reject) {
        if (!file) return reject(new Error('请选择 Excel 文件！'));
        if (!sheetName) return reject(new Error('请输入 Excel 工作表名！'));
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target?.result as any);
            const workbook = read(data, {type: 'array'});
            const sheet = workbook?.SheetNames?.find((item) => item == sheetName);
            if (sheet) {
                const worksheet = workbook.Sheets[sheet];
                const array = utils.sheet_to_json<string[]>(worksheet, {header: 1}); // 解析成二维数组
                const json = utils.sheet_to_json(worksheet); // 解析成二维数组
                const fullJson = [];
                array.forEach((d) => {
                    const row = {};
                    for (let i = 0; i < d.length; i++) {
                        const key = getCharByIndex(i);
                        row[key] = d[i];
                    }
                    fullJson.push(row);
                });
                return resolve({array, json, fullJson});
            } else {
                return reject(new Error(`Excel文件未找到 ${sheetName} 工作表！`));
            }
        };

        reader.onerror = (e) => {
            return reject(new Error('Excel文件读取出错！'));
        };
        reader.readAsArrayBuffer(file);
    });
}

/**
 * 根据Excel文件，获取二维数组
 */
export async function readerExcelToArray(file: File, sheetName: String) {
    return new Promise(function (resolve, reject) {
        if (!file) return reject(new Error('请选择 Excel 文件！'));
        if (!sheetName) return reject(new Error('请输入 Excel 工作表名！'));
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target?.result as any);
            const workbook = read(data, {type: 'array'});
            const sheet = workbook?.SheetNames?.find((item) => item == sheetName);
            if (sheet) {
                const worksheet = workbook.Sheets[sheet];
                const aoa = utils.sheet_to_json<string[]>(worksheet, {header: 1}); // 解析成二维数组
                return resolve(aoa);
            } else {
                return reject(new Error(`Excel文件未找到 ${sheetName} 工作表！`));
            }
        };

        reader.onerror = (e) => {
            return reject(new Error('Excel文件读取出错！'));
        };
        reader.readAsArrayBuffer(file);
    });
}

/**
 * 根据Excel文件，获取Json，第一行为Json属性名称
 */
export async function readerExcelToJson(file: File, sheetName: String) {
    return new Promise(function (resolve, reject) {
        if (!file) return reject(new Error('请选择 Excel 文件！'));
        if (!sheetName) return reject(new Error('请输入 Excel 工作表名！'));
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target?.result as any);
            const workbook = read(data, {type: 'array'});
            const sheet = workbook?.SheetNames?.find((item) => item == sheetName);
            if (sheet) {
                const worksheet = workbook.Sheets[sheet];
                const json = utils.sheet_to_json(worksheet); // 解析成Json
                return resolve(json);
            } else {
                return reject(new Error(`Excel文件未找到 ${sheetName} 工作表！`));
            }
        };

        reader.onerror = (e) => {
            return reject(new Error('Excel文件读取出错！'));
        };
        reader.readAsArrayBuffer(file);
    });
}

/**
 * 根据Excel文件，获取Json，Excel列名为Json属性名称
 */
export async function readerExcelToFullJson(file: File, sheetName: String) {
    return new Promise(function (resolve, reject) {
        if (!file) return reject(new Error('请选择 Excel 文件！'));
        if (!sheetName) return reject(new Error('请输入 Excel 工作表名！'));
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target?.result as any);
            const workbook = read(data, {type: 'array'});
            const sheet = workbook?.SheetNames?.find((item) => item == sheetName);
            if (sheet) {
                const worksheet = workbook.Sheets[sheet];
                const aoa = utils.sheet_to_json<string[]>(worksheet, {header: 1}); // 解析成二维数组
                const fullJson = [];
                aoa.forEach((d) => {
                    const row = {};
                    for (let i = 0; i < d.length; i++) {
                        const key = getCharByIndex(i);
                        row[key] = d[i];
                    }
                    fullJson.push(row);
                });
                return resolve(fullJson);
            } else {
                return reject(new Error(`Excel文件未找到 ${sheetName} 工作表！`));
            }
        };

        reader.onerror = (e) => {
            return reject(new Error('Excel文件读取出错！'));
        };
        reader.readAsArrayBuffer(file);
    });
}

/**
 * 生成Excel列字母序号
 */
function getCharByIndex(index: number) {
    const chars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    if (index < chars.length) {
        return chars[index];
    }
    const n = parseInt(String(index / chars.length));
    const m = index % chars.length;
    return chars[n] + chars[m];
}

/**
 * 校验导入的Excel表头是否一致
 * @param excelTitles excel表头
 * @param titles 需要验证的表头
 */
export function validateExcelTitle(excelTitles: string[], titles: string[]) {
    if (excelTitles?.length != titles?.length) {
        message.error('导入的Excel文件与模板文件列表数不一致！');
        return false;
    }

    let valid = true;
    titles.forEach((title) => {
        if (valid && excelTitles.indexOf(title) == -1) {
            message.error(`导入的Excel文件，工作表列表 ${title} 不存在！`);
            valid = false;
        }
    });

    return valid;
}

/**
 * 规则校验Excel单元格
 */
export async function validateExcelCell(rules: RuleProps | RuleProps[], record: object, dataIndex) {
    const errorMsgs = [];
    const value = record[dataIndex];
    if (Array.isArray(rules)) {
        const roles = rules as RuleProps[];
        for (let i = 0; i < roles.length; i++) {
            const rule = roles[i];
            await validateRecordCell(rule, record, dataIndex, (errorMsg) => {
                if (errorMsg) errorMsgs.push(errorMsg);
            });
        }
    } else if (typeof rules == 'object') {
        await validateRecordCell(rules, record, dataIndex, (errorMsg) => {
            if (errorMsg) errorMsgs.push(errorMsg);
        });
    }
    return errorMsgs;
}

/**
 * 规则校验记录行，获取汇总错误信息
 */
async function validateRecord(errors, record, index, rules) {
    const keys = Object.keys(rules);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const errorMsgs = await validateExcelCell(rules[key], record, key);
        errorMsgs.forEach((msg) => {
            errors.push({
                rowIndex: index,
                title: key,
                message: msg,
            });
        });
    }
}

/**
 * 规则校验导入的Excel表头及数据
 */
export async function validateExcel(jsonData: any[], rules, ruleTitle: RuleTitleProps) {
    if (validateExcelTitle(ruleTitle.excelTitles, ruleTitle.titles) && Array.isArray(jsonData)) {
        const errors = [];

        for (let index = 0; index < jsonData.length; index++) {
            const row = jsonData[index];
            if (errors.length == 0) {
                await validateRecord(errors, row, index, rules);
                if (errors.length > 0) {
                    const msgs = [];
                    errors.forEach((error) => {
                        msgs.push(`第 ${error.rowIndex + 1} 行 ${error.title} 校验错误：${error.message}`);
                    });
                    message.error({content: msgs.join('\n'), class: 'x-message-wrap'});
                }
            }
        }

        return errors.length == 0 ? true : false;
    }

    return false;
}

/**
 * 导出Excel文件
 * @param array 导出数据，包括表头
 * @param cols 列宽
 * @param fileName 导出文件名
 * @param merges 分组表头合并配置
 */
export async function writeExcel(array, cols: number[], fileName: string, merges = null) {
    const sheet = utils.aoa_to_sheet(array);
    sheet['!cols'] = [];
    cols.forEach((col) => {
        sheet['!cols'].push({wch: col}); // 设置列宽
    });

    if (Array.isArray(merges)) sheet['!merges'] = merges;
    // const sheetName = 'Sheet1';
    // const workbook = {
    //   SheetNames: [sheetName],
    //   Sheets: {},
    // };
    // workbook.Sheets[sheetName] = sheet;

    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, sheet, 'Sheet1'); // 工作簿名称
    writeFile(workbook, fileName);
}
