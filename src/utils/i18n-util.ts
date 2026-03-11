import {set} from 'lodash-es';
import i18nIns from "../i18n";
import {useThemeStore} from "@/store/modules/theme-store";
import {LOCALE_MSG, LOCALE_MSG_LIST} from "@/config/common";

declare type Recordable<T = any> = Record<string, T>;

/**
 * 国际化健值对实体
 */
interface I18nModel {
    key: string;
    msg: string;
}

/**
 * 获取该目录下所有国际化信息
 * @param modules 目录信息
 */
export function genMessage(modules: Record<string, Record<string, any>>, lang: string) {
    const obj: Recordable = {};
    Object.keys(modules).forEach((key) => {
        const langFileModule = modules[key].default;

        const start = key.indexOf('./src/') + './src/'.length; //./src/common.ts
        const end = key.lastIndexOf('.');
        const fileName = key.substring(start, end);
        const keyList = fileName.split('/');
        const moduleName = keyList.shift();
        const objKey = keyList.join('.');

        if (moduleName) {
            if (objKey) {
                set(obj, moduleName, obj[moduleName] || {});
                set(obj[moduleName], objKey, langFileModule);
            } else {
                set(obj, moduleName, langFileModule || {});
            }
        }
    });
    return obj;
}

/**
 * 将国际化信息转换成列表
 */
function transformI18nToList(moduleName, messages) {
    if (!messages) return [];
    const i18ns = [] as I18nModel[];
    if (moduleName) moduleName += '.';
    Object.keys(messages).forEach((key) => {
        const message = messages[key];
        if (typeof message === 'object') {
            const children = transformI18nToList(moduleName + key, message);
            i18ns.push(...children);
        } else {
            const info = {
                key: moduleName + key,
                msg: message,
            } as I18nModel;
            i18ns.push(info);
        }
    });
    return i18ns;
}

/**
 * 返回该信息的国际化信息
 * @param msg lang参数指定的信息，默认中文
 */
export function i18n(msg: string, lang = 'zh_CN') {
    if (!msg) return msg;
    const {messages, t} = i18nIns.global;

    const themeStore = useThemeStore();
    const interLang = themeStore.interLang || 'zh_CN';
    if (interLang === lang) return msg;

    let langMsgList = LOCALE_MSG_LIST[lang] as I18nModel[];
    if (!langMsgList) {
        langMsgList = transformI18nToList('', messages.value[lang]);
        LOCALE_MSG_LIST[lang] = langMsgList;
    }

    let localMsg = LOCALE_MSG[msg];
    if (localMsg) return localMsg;

    const index = langMsgList.findIndex((d) => d.msg === msg);
    localMsg = index != -1 ? t(langMsgList[index].key) : msg;
    if (langMsgList[index].key == localMsg) localMsg = msg;
    LOCALE_MSG[msg] = localMsg;
    if (index != -1) {
        langMsgList.splice(index, 1);
    }

    return localMsg;
}

/**
 * 返回该健的国际化信息
 * @param key 国际化信息key值，如：common.closeText
 */
export function locale(key: string) {
    const {t} = i18nIns.global;
    return t(key);
}
