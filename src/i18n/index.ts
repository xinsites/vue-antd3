import {createI18n, I18n} from 'vue-i18n';
import zhCNLocale from './lang/zh_CN';
import zhTWLocale from './lang/zh_TW';
import enUSLocale from './lang/en_US';
import {getCacheKeySetting} from "xin-antd3-ui/es/utils/theme-util";

const messages = {
    zh_CN: zhCNLocale,
    zh_TW: zhTWLocale,
    en_US: enUSLocale,
};

/**
 * 国际化配置，解决
 */
const i18nIns = createI18n({
    messages,
    legacy: false,
    globalInjection: true,
    silentTranslationWarn: true,
    locale: getCacheKeySetting('interLang') || 'zh_CN', // 默认语言zh_CN
}) as any;


export default i18nIns;
