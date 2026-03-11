import {isDef, isEmpty} from "xin-antd3-ui";

/**
 * 指令使用于a-row，更精确的响应式布局，根据最小宽度值计算每行可以显示的最大a-col数
 * 例如：v-col="{ minWidth: 300 }"，a-row下所有a-col宽度最小值为300px，根据a-row宽度计算每行可以显示多少个a-col
 * 例如：v-col="{ minWidth: 300, maxCols: 3 }"，根据a-row宽度及minWidth值，计算每行可以显示多少个a-col，超过3个按3个显示
 * 例如：v-col="{ minWidth: 300, maxCols: 3, offset:50 }"，根据a-row宽度及minWidth值(误差50)，计算每行可以显示多少个a-col，超过3个按3个显示
 * v-col="{
 *  minWidth: 每个a-col的最小宽度
 *  maxCols: 每行最多显示的a-col个数
 *  offset: 最小宽度向下偏差
 *  notCss: 不计算在内的样式
 *  collapsedRows: 用于查询表单，闭合时显示的行数，默认为1，例如：collapsedRows=2，当一行显示3个v-col，闭合时显示6个v-col
 *  collapsed: 用于查询表单，是否闭合，可与lastColCls联合使用
 *  lastColCls: 用于查询表单，最后一个a-col的class名称，配置后该a-col不受闭合开关影响，如果需要将查询、重置、展开/闭合开关放到最后一个请配置该值
 * }"
 */
export const col = {
    mounted(el, binding) {
        // el为绑定的元素，binding为绑定给指令的对象
        let width = 0;

        function changeWidth() {
            // const timestamp = el.getAttribute('timestamp') || 0;
            if (el.offsetWidth == 0) return;
            if (width !== el.offsetWidth) {
                const config = el.getAttribute('config');
                col.colPercent(el, config ? JSON.parse(config) : binding.value);
            }
            width = el.offsetWidth;
        }

        if (typeof binding.value == 'object') {
            el.interval = setInterval(changeWidth, 300);
        }
    },
    updated(el, binding) {
        if (col.isChange(el, binding.value)) col.colPercent(el, binding.value);
    },
    beforeUnmount(el, binding) {
        clearInterval(el.interval); //解绑
    },
    isChange(el, bindingConfig) {
        const config = {...bindingConfig, childCount: el.childNodes?.length};
        const oldConfig = el.getAttribute('config');
        el.setAttribute('config', JSON.stringify(config));

        return JSON.stringify(config) != oldConfig;
    },
    //获取每行需要的a-col数
    getCols(el, bindingConfig) {
        const minWidth = bindingConfig['minWidth'] || 400;
        const offset = bindingConfig['offset'];
        const maxCols = bindingConfig['maxCols'] || 1000;
        const cols = parseInt(el.offsetWidth / minWidth);

        if (cols < 1) return 1;
        if (!isDef(offset)) {
            if (minWidth - el.offsetWidth / (cols + 1) <= offset) {
                return cols + 1 < maxCols ? cols + 1 : maxCols;
            }
        }
        return cols < maxCols ? cols : maxCols;
    },
    //将所有a-col等宽处理
    colPercent(el, bindingConfig) {
        const cols = col.getCols(el, bindingConfig); //每行显示的a-col个数
        const percent = 100 / cols; //计算百分比
        const colEls = el.childNodes;
        const lastColCls = bindingConfig['lastColCls']; //闭合开关所在a-col的class名称
        const collapsed = bindingConfig['collapsed']; //是否闭合
        const collapsedRows = bindingConfig['collapsedRows'] || 1; //闭合时显示的行数
        const collapsedMaxCols = collapsedRows * cols; //闭合时最大显示的a-col数
        const notCss = bindingConfig['notCss'];

        let index = 1; //a-col是显示的位置号
        colEls.forEach((colEl) => {
            if (!(notCss && colEl.classList?.contains(notCss))) {
                if (colEl.classList?.contains('ant-col')) {
                    colEl.style.display = 'block';
                    colEl.style.flex = `0 0 ${percent}%`;
                    colEl.style.maxWidth = `${percent}%`;

                    if (!isDef(collapsed)) {
                        if (!isEmpty(lastColCls) && colEl.classList?.contains(lastColCls)) {
                            if (index % cols != 0) {
                                const diffCols = cols - (index % cols);
                                const diffPercent = percent + percent * diffCols;
                                colEl.style.flex = `0 0 ${diffPercent}%`;
                                colEl.style.maxWidth = `${diffPercent}%`;
                            }
                        } else if (collapsed) {
                            //没定义最后一个a-col是闭合开关
                            if (isEmpty(lastColCls)) {
                                if (index > collapsedMaxCols) {
                                    colEl.style.display = 'none'; //闭合，需要不显示的a-col
                                    index--;
                                }
                            } else if ((cols > 1 && index >= collapsedMaxCols) || (cols == 1 && index > collapsedMaxCols)) {
                                colEl.style.display = 'none'; //闭合，需要不显示的a-col
                                index--;
                            }
                        }
                    }

                    index++;
                }
            }
            // wrapEl.className = `ant-col x-col-${cols}`;
        });
    },
};
