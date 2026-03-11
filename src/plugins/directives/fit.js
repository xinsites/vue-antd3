import {useLayoutStore} from "@/store/modules/layout-store";
import {watch, ref, nextTick} from 'vue';
import {queryParentByClass, childNodesVisible, isDef} from "xin-antd3-ui";

/**
 * 宽高填充布局，将该指令的元素宽高赋值为实际宽高值(代替100%值)，内部元素高于该元素将出现滚动条
 * v-fit对象赋值：表示v-fit元素(el)会填充布局，上下填充布局、左右填充布局、综合填充布局都可满足，下面对各对象key值说明：
 * 对象属性(resizeCss)：string、string[]，监听CSS元素宽高变化后，el将会重新填充布局
 * 对象属性(scrollCss)：string，对el元素下scrollCss表示的元素填充布局，如果没有scrollCss将对el填充布局，如a-table，是对ant-table-body的填充布局
 * 对象属性(subHeight)：number，scrollCss元素需要减少的高度，scrollCss填充布局的实际高度=el.offsetHeight - subHeight
 * 对象属性(minHeight)：number，当el元素或者scrollCss元素的实际高度小于minHeight后，按minHeight高度设置，这样该页面将会出现滚动条
 * 对象属性(fits)：数组元素对象，同页面的其他填充布局配置，对象值包括fitCss、scrollCss、subHeight、minHeight，fitCss：其他填充布局的Css，针对左右填充布局
 * fits：页面有多个元素块需要填充布局(左右填充布局)，只用一个v-fit，则对象属性(fits)必填，如果使用多个v-fit则对象属性(fits)不必配置
 * 例如：v-fit="{ resizeCss: 'xin-split-panel-wrap', subHeight: 55 + 64, minHeight: 55 }"
 */
export const fit = {
    mounted(el, binding) {
        if (binding.value == false) return;
        // el为绑定的元素，binding为绑定给指令的对象

        function getParentEl(el, cssList) {
            let parentEl = null;
            cssList.forEach((css) => {
                if (!parentEl) parentEl = queryParentByClass(el, css);
            });
            return parentEl;
        }

        const rootEl = getParentEl(el, ['xin-layout-content', 'ant-modal']); //分别对应tab页面、弹出页面
        const pageEl = getParentEl(el, ['page-component', 'ant-modal-body']);
        if (!rootEl || !pageEl) return;

        let scrollEl, subHeight, minHeight; //目标元素中滚动条元素、相减的高度、最小高度

        if (!pageEl.allFits) {
            pageEl.allFits = []; //所有填充布局配置
            pageEl.resizeEls = []; //自适应宽高的所有元素集合，这些元素宽高会变化，el需要宽高重新填充布局
            pageEl.resizeHeights = ref([]); //自适应宽高的所有元素高度集合
            pageEl.changeStore = useLayoutStore().change;

            if (rootEl.classList.contains('ant-modal')) {
                pageEl.resizeEls.push(rootEl);
            }

            pageEl.handlerResize = () => {
                pageEl.allFits?.forEach((fit) => {
                    childNodesVisible(fit.fitEl, false); //隐藏元素，真实计算出在满屏状态下el实际高度
                    fit.fitEl.style.height = '100%'; //设置成100%，el.offsetHeight得出实际高度
                });

                pageEl.allFits?.forEach((fit, index) => {
                    const offsetHeight = fit.fitEl.offsetHeight;
                    fitElement(rootEl, fit.fitEl, fit.scrollEl, fit.subHeight, fit.minHeight);
                    childNodesVisible(fit.fitEl, true);
                    if (offsetHeight != fit.fitEl.offsetHeight) handlerResize(index); //超出了设定的最小值，其他填充布局重新设置
                });
            };
        }

        function handlerResize(flag) {
            pageEl.allFits?.forEach((fit, index) => {
                if (flag != index) {
                    fitElement(rootEl, fit.fitEl, fit.scrollEl, fit.subHeight, fit.minHeight);
                    childNodesVisible(fit.fitEl, true);
                }
            });
        }

        //宽高变动元素重新计算高度
        function handlerOffsetHeight() {
            if (el.offsetWidth == 0) return;
            pageEl.resizeEls?.forEach((autoEl, index) => {
                pageEl.resizeHeights.value[index] = autoEl.offsetHeight;
            });
        }

        if (rootEl) {
            if (typeof binding.value == 'object') {
                Object.keys(binding.value).forEach((key) => {
                    const value = binding.value[key];
                    if (key == 'resizeCss') {
                        if (typeof value == 'string') {
                            const autoEl = rootEl.querySelector('.' + value);
                            if (autoEl) pageEl.resizeEls.push(autoEl);
                        } else if (Array.isArray(value)) {
                            value.forEach((css) => {
                                const autoEl = rootEl.querySelector('.' + css);
                                if (autoEl) pageEl.resizeEls.push(autoEl);
                            });
                        }
                    } else if (key == 'scrollCss') {
                        scrollEl = rootEl.querySelector('.' + value);
                    } else if (key == 'subHeight') {
                        subHeight = Number(value);
                    } else if (key == 'minHeight') {
                        minHeight = Number(value);
                    } else if (key == 'fits' && Array.isArray(value)) {
                        value.forEach((fit) => {
                            if (fit['fitCss']) {
                                const fitItem = {
                                    fitEl: rootEl.querySelector('.' + fit['fitCss']),
                                };
                                if (fitItem.fitEl) {
                                    if (fit['scrollCss']) fitItem.scrollEl = rootEl.querySelector('.' + fit['scrollCss']);
                                    if (fit['subHeight']) fitItem.subHeight = Number(fit['subHeight']);
                                    if (fit['minHeight']) fitItem.minHeight = Number(fit['minHeight']);
                                    pageEl.allFits.push(fitItem);
                                }
                            }
                        });
                    }
                });
            }

            pageEl.allFits.push({
                fitEl: el,
                scrollEl: scrollEl,
                subHeight: subHeight,
                minHeight: minHeight,
            });

            if (pageEl.resizeEls.length > 0) pageEl.style.overflow = el.offsetHeight > 10 ? 'hidden' : ''; //防止瞬间出现的滚动条
        }

        pageEl.handlerResize();
        if (!pageEl.interval) {
            pageEl.interval = setInterval(handlerOffsetHeight, 300);
            watch([() => pageEl.changeStore?.layoutContentSize, () => pageEl.changeStore?.windowSize], (value) => {
                if (pageEl.changeStore) {
                    pageEl.style.overflow = '';
                    pageEl.handlerResize();
                }
            });

            watch(
                () => pageEl.resizeHeights,
                (newValues, oldValues) => {
                    if (pageEl.changeStore) {
                        pageEl.style.overflow = el.offsetHeight > 10 ? 'hidden' : ''; //防止瞬间出现的滚动条
                        pageEl.handlerResize();
                    }
                },
                {
                    deep: true,
                },
            );
        }
    },
    beforeUnmount(el, binding) {
        const pageEl = queryParentByClass(el, 'page-component');
        if (pageEl) {
            pageEl.changeStore = null;
            if (Array.isArray(pageEl.resizeEls)) pageEl.resizeEls = null;
            clearInterval(pageEl.interval); //解绑
            pageEl.resizeHeights.value = null;

            pageEl.allFits = null;
        }
    },
};

/**
 * 元素填充显示，超出后添加流动条
 * @param fitEl 目标元素
 * @param scrollEl 目标元素中的滚动条元素
 * @param subHeight 元素需要减去的高度
 * @param minHeight 元素填充显示最小高度
 */
function fitElement(rootEl, fitEl, scrollEl, subHeight, minHeight) {
    if (isDef(fitEl)) return null;

    if (rootEl.classList.contains('ant-modal')) {
        const bodyEl = rootEl.querySelector('.ant-modal-body');
        if (bodyEl) bodyEl.style.overflow = 'auto'; //弹出窗口填充监听
    } else {
        fitEl.style.overflow = 'auto';
    }
    fitEl.style.width = '100%';
    if (scrollEl) {
        const scrollHeight = fitEl.offsetHeight - (subHeight ? subHeight : 0);
        scrollEl.style.overflow = 'auto';

        if (minHeight > 0 && scrollHeight < minHeight) {
            scrollEl.style.height = minHeight + 'px';
            scrollEl.style.maxHeight = minHeight + 'px';
        } else if (scrollHeight > 0) {
            scrollEl.style.height = scrollHeight + 'px';
            scrollEl.style.maxHeight = scrollHeight + 'px';
        }
    } else {
        if (minHeight > 0 && fitEl.offsetHeight < minHeight) {
            fitEl.style.height = minHeight + 'px';
        } else {
            fitEl.style.height = fitEl.offsetHeight + 'px';
        }
    }
}
