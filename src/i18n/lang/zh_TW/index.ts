import { genMessage } from '@/utils/i18n-util';

const modules = import.meta.globEager('./src/**/*.ts');
export default {
  ...genMessage(modules, 'zh_TW'),
};
