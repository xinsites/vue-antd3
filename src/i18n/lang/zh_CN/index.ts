import { genMessage } from '@/utils/i18n-util';

const modules = import.meta.glob('./src/**/*.ts', {eager: true})
export default {
    ...genMessage(modules, 'zh_CN'),
};
