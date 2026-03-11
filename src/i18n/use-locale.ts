/**
 * AntDesignVue、Dayjs 国际化配置
 */
import {ref, watch} from 'vue';
import {useI18n} from 'vue-i18n';
import type {Locale} from 'ant-design-vue/es/locale-provider';
import type {XinLocale} from 'xin-antd3-ui';
import {storeToRefs} from 'pinia';
// AntDesignVue
import zh_CN from 'ant-design-vue/es/locale/zh_CN';
import zh_TW from 'ant-design-vue/es/locale/zh_TW';
import en_US from 'ant-design-vue/es/locale/en_US';
// Dayjs
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/zh-tw';

// XinAntd3
import xinZh_CN from 'xin-antd3-ui/locale/zh_CN';
import xinZh_TW from 'xin-antd3-ui/locale/zh_TW';
import xinEn_US from 'xin-antd3-ui/locale/en_US';
import {useThemeStore} from "../store/modules/theme-store";
import {LOCALE_MSG, LOCALE_MSG_LIST} from "@/config/common";

const antLocales = {zh_CN, zh_TW, en_US};
const xinLocales = {zh_CN: xinZh_CN, zh_TW: xinZh_TW, en_US: xinEn_US};

export function useLocale() {
    const themeStore = useThemeStore();
    const {locale} = useI18n();
    const antLocale = ref<Locale>();
    const xinLocale = ref<XinLocale>();
    const {interLang} = storeToRefs(themeStore);
    watch(
        interLang,
        () => {
            locale.value = interLang.value;
            antLocale.value = antLocales[locale.value];
            xinLocale.value = xinLocales[locale.value];
            dayjs.locale(locale.value.toLowerCase().replace(/_/g, '-'));
            Object.keys(LOCALE_MSG).forEach(key => {
                delete LOCALE_MSG[key];  //删除转换的国际化语言
            });
            Object.keys(LOCALE_MSG_LIST).forEach(key => {
                delete LOCALE_MSG_LIST[key];  //删除转换的国际化语言列表
            });
        },
        {immediate: true},
    );
    return {antLocale, xinLocale};
}
