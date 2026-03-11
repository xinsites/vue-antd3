/**
 * 按钮级权限控制
 */
import type {App} from 'vue';
import {useUserStore} from '@/store/modules/user-store';

/**
 * 判断数组是否包含全部值
 * @param array 数组
 * @param value 判断值
 */
function arrayHas(array: string[], value: string | string[]): boolean {
    if (!value) return true;
    if (!Array.isArray(array)) return false;
    if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
            if (!array.includes(value[i])) return false;
        }
        return true;
    }
    return array.includes(value);
}

/**
 * 判断数组是否包含任意值
 * @param array 数组
 * @param value 判断值
 */
function arrayHasAny(array: string[], value: string | string[]): boolean {
    if (!value) return true;
    if (!Array.isArray(array)) return false;
    if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
            if (array.includes(value[i])) return true;
        }
        return false;
    }
    return array.includes(value);
}

/**
 * 是否有全部角色权限
 * @param perVal 角色标识或标识数组
 */
export function hasRole(perVal: string | string[]): boolean {
    const userStore = useUserStore();
    if (userStore.superAdminer) return true;
    return arrayHas(userStore?.roleAuths, perVal);
}

/**
 * 是否有任意角色权限
 * @param perVal 角色标识或标识数组
 */
export function hasAnyRole(perVal: string | string[]): boolean {
    const userStore = useUserStore();
    if (userStore.superAdminer) return true;
    return arrayHasAny(userStore?.roleAuths, perVal);
}

/**
 * 是否有全部功能权限
 * @param perVal 权限标识或标识数组
 */
export function hasAuth(perVal: string | string[]): boolean {
    const userStore = useUserStore();
    if (userStore.superAdminer) return true;
    return arrayHas(userStore?.auths, perVal);
}

/**
 * 是否有任意功能权限
 * @param perVal 权限标识或标识数组
 */
export function hasAnyAuth(perVal: string | string[]): boolean {
    const userStore = useUserStore();
    if (userStore.superAdminer) return true;
    return arrayHasAny(userStore?.auths, perVal);
}

export default {
    install(app: App) {
        // 添加自定义指令
        app.directive('role', {
            mounted: (el, binding) => {
                if (!hasRole(binding.value)) {
                    el.parentNode?.removeChild(el);
                }
            },
        });
        app.directive('any-role', {
            mounted: (el, binding) => {
                if (!hasAnyRole(binding.value)) {
                    el.parentNode?.removeChild(el);
                }
            },
        });
        app.directive('auth', {
            mounted: (el, binding) => {
                if (!hasAuth(binding.value)) {
                    el.parentNode?.removeChild(el);
                }
            },
        });
        app.directive('any-auth', {
            mounted: (el, binding) => {
                if (!hasAnyAuth(binding.value)) {
                    el.parentNode?.removeChild(el);
                }
            },
        });
    },
};
