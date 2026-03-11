import {createApp} from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import i18nIns from '@/i18n';
import {setupDefineComp} from '@/plugins/global-component';
import {setupAssets} from '@/plugins/assets';
import {setupDirectives} from '@/plugins/directives';
import {setupGlobalMethods} from '@/plugins/global-methods';
import '@/mock';

const app = createApp(App);

function setupPlugins() {
    // 注册全局自定义组件
    setupDefineComp(app);
    // 引入静态资源
    setupAssets();
    // 注册全局方法，如：app.config.globalProperties.$message = message
    setupGlobalMethods(app);
    // 注册全局自定义指令，如：v-permission权限指令
    setupDirectives(app);
}

async function setupApp() {
    app.use(router);
    app.use(store);
    app.use(i18nIns);
    app.mount('#app');
}

setupPlugins();

setupApp();
