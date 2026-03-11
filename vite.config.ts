import {defineConfig} from 'vite';
import legacy from '@vitejs/plugin-legacy';
import ViteCompression from 'vite-plugin-compression';
import vue from '@vitejs/plugin-vue';
import {resolve} from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import ViteComponents from 'unplugin-vue-components/vite';
import {AntDesignVueResolver} from 'unplugin-vue-components/resolvers';
import {XinAntdResolver} from 'xin-antd3-ui/lib/utils/resolvers';

// https://vitejs.dev/config/
export default defineConfig(({command}) => {
    const isBuild = command === 'build';
    return {
        base: './',
        resolve: {
            // alias: {
            //   '@': resolve(__dirname, 'src'), // 设置 `@` 指向 `src` 目录
            //   'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
            // },
            alias: [
                {find: '@', replacement: resolve(__dirname, 'src')}, // 设置 `@` 指向 `src` 目录
                {find: 'public', replacement: resolve(__dirname, 'src/public')},
                {find: 'components', replacement: resolve(__dirname, 'src/public/components')},
                {find: 'pages', replacement: resolve(__dirname, 'src/pages')},
                {find: 'styles', replacement: resolve(__dirname, 'src/styles')},
                {find: /^~/, replacement: ''},
                {find: 'vue-i18n', replacement: 'vue-i18n/dist/vue-i18n.cjs.js'},
            ],
        },
        plugins: [
            vue(),
            //自动导入composition api
            AutoImport({
                imports: ['vue', 'vue-router'], // 自动导入vue和vue-router相关函数
                dts: 'src/auto-import.d.ts', // 生成 `auto-import.d.ts` 全局声明
            }),
            //自动按需引入
            ViteComponents({
                dts: false,
                resolvers: [
                    XinAntdResolver({importStyle: false}),
                    AntDesignVueResolver({importStyle: false}),
                ],
            }),
            // 打包gzip压缩
            ViteCompression({
                disable: !isBuild, //是否禁用压缩，默认为 false
                threshold: 10240, //启用压缩的文件阈值(单位：字节)，这里是文件大于 10KB 时才会被压缩
                algorithm: 'gzip', //采用的压缩算法，默认是 gzip，其他算法 brotliCompress
                ext: '.gz', //压缩后的文件扩展名
                // deleteOriginFile: true, //压缩后是否删除原文件，默认为 false
            }),
            // // 兼容低版本浏览器
            // legacy({
            //   targets: ['Chrome 63'],
            //   modernPolyfills: true,
            // }),
        ],
        css: {
            preprocessorOptions: {
                less: {
                    javascriptEnabled: true,
                    additionalData: ` @import "@/styles/variables.less";`,
                },
            },
        },
        // 引入第三方的配置
        optimizeDeps: {
            include: ['ant-design-vue', 'ant-design-vue/es', '@ant-design/icons-vue'],
        },
        server: {
            // base: "/home", // 设置项目运行基础路径
            // port: 3000, // 设置服务启动端口号
            open: false, // 设置服务启动时是否自动打开浏览器
            hmr: true, // 设置开启热更新
            // hmr: {
            //   overlay: false, //禁用服务器错误遮罩层
            // },
            proxy: {
                '/api': {
                    target: 'http://localhost:8094/',
                    changeOrigin: true,
                    rewrite: (path) => path.replace('^/api', '/api'),
                },
                '/ws-api': {
                    target: 'http://localhost:7002',
                    changeOrigin: true, //是否允许跨域
                    ws: true,
                },
            },
        },
        build: {
            target: 'chrome63',
            chunkSizeWarningLimit: 500, //打包块限制的大小500kb
            // outDir: 'dist',  // 产出目录
            brotliSize: false, // 进行压缩计算
            // terserOptions: {
            //     compress: {
            //         drop_console: isBuild, // 生产环境去除console
            //         drop_debugger: isBuild, // 生产环境去除debugger
            //     },
            // },
        },
    };
});
