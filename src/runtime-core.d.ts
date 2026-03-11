declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        i18n: (msg: string, lang: string) => string;
        locale: (key: string) => string;
    }
}
export {};
