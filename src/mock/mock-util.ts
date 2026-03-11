import {deepClone, getParentIdsByTreeList, isDef} from "xin-antd3-ui";

export function getPageData(listData, params) {
    const start = (params.current - 1) * params.pageSize || 0;
    let list = deepClone(listData);
    if (params.where?.length > 0) {
        if (params.linkType == 'or') {
            list = list.filter((it) => validItem(it, params.where) == true);
        } else {
            list = filterList(list, params.where);
        }
    }
    return {
        total: list.length,
        list: list.splice(start, params.pageSize || 10),
    };
}

export function getWhereList(listData, params) {
    let list = deepClone(listData);
    if (params?.where?.length > 0) {
        if (params.linkType == 'or') {
            list = list.filter((it) => validItem(it, params.where) == true);
        } else {
            list = filterList(list, params.where);
        }
    }
    return list;
}

export function getWhereTreeList(listData, params, rowKey = 'idleaf', pidKey = 'pid') {
    let list = deepClone(listData);
    if (params.linkType == 'or') {
        list = list.filter((it) => validItem(it, params.where) == true);
    } else {
        list = filterList(list, params.where);
    }
    let treeList = deepClone(listData);
    const parentIds = getParentIdsByTreeList(treeList, list.map((item) => item[rowKey]), true, rowKey, pidKey);
    return treeList.filter((item) => parentIds.includes(item[rowKey]) === true);
}

function filterList(list, where) {
    where?.forEach((item) => {
        if (item) {
            const field = item['field'];
            if (field) {
                if (item.operator == 'in') {
                    const values = item.value ? item.value.toString().split(',') : [];
                    list = list.filter((it) => values.indexOf(it[field] + '') >= 0);
                } else if (item.operator == '=' || !item.operator) {
                    if (field == 'userRole' || field == 'userDept') {
                        list = list.filter((it) => valueIncludes(it[field], item.value) == true);
                    } else {
                        list = list.filter((it) => it[field] == item.value);
                    }
                } else if (item.operator == 'like') {
                    list = list.filter((it) => it[field].indexOf(item.value) != -1);
                }
            }
        }
    });
    return list;
}


function validItem(item, where) {
    let flag = false;
    where.forEach((it) => {
        if (it.operator == 'like') {
            if (!it.value || item[it.field].indexOf(it.value) != -1) flag = true;
        } else if (it.operator == '=' || !it.operator) {
            if (it.field == 'userRole' || it.field == 'userDept') flag = valueIncludes(item[it.field], it.value);
            else if (item[it.field] == it.value) flag = true;
        } else if (it.operator == 'in') {
            const values = it.value ? it.value.toString().split(',') : [];
            if (values.indexOf(item[it.field] + '') >= 0) flag = true;
        }
    });
    return flag;
}

function valueIncludes(fieldVal, value) {
    if (isDef(fieldVal)) return false;
    const values = fieldVal.split(',');
    return values.includes(value + '');
}

export function getErrorReturn(errorMsg) {
    return {
        code: 1,
        message: errorMsg,
        data: null,
    };
}

export function isExistVal(list, rowKey, valKey, record) {
    let exist = false;
    list.forEach((item) => {
        if (!exist) {
            if (item[valKey] == record[valKey]) {
                exist = true;
                if (item[rowKey] == record[rowKey]) exist = false;
            }
        }
    })
    return exist;
}
