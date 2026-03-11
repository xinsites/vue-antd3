import {useLayoutStore} from "@/store/modules/layout-store";
import { watch, nextTick } from 'vue';
import {queryParentByClass} from "xin-antd3-ui";

/**
 * 元素尺寸变化，获取元素宽高、查询模块、表格头部、表格分页等模块高度
 */
export const resize = {
  mounted(el, binding) {
    // el为绑定的元素，binding为绑定给指令的对象

    el.handlerResize = () => {
      const tableHeight = getHeight();
      const offsetWidth = el.offsetWidth;
      setVisible(false); //隐藏元素，真实计算出在满屏状态下el实际高度
      binding.value(
        Object.assign(
          {
            width: offsetWidth,
            height: el.offsetHeight,
          },
          tableHeight,
        ),
      );
      setVisible(true);
    };

    el.resizeHandler = (count = 0) => {
      nextTick(() => {
        el.handlerResize();
      });
    };

    function getHeight() {
      const searchHeightEL = el.getElementsByClassName('table-page-search'); //表格查询模块元素
      const theadHeightEL = el.getElementsByClassName('ant-table-thead'); //绑定元素有表格，获取表格头部模块元素
      const pageHeightEL = el.getElementsByClassName('ant-table-pagination'); //绑定元素有表格，获取表格分页模块元素
      return {
        searchHeight: searchHeightEL && searchHeightEL.length > 0 ? searchHeightEL[0].clientHeight : 0,
        theadHeight: theadHeightEL && theadHeightEL.length > 0 ? theadHeightEL[0].clientHeight : 0,
        pageHeight: pageHeightEL && pageHeightEL.length > 0 ? pageHeightEL[0].clientHeight * 2 : 0,
      };
    }

    const pageEl = queryParentByClass(el, 'xin-page-full');
    const modifiers = binding.modifiers;

    function setVisible(visible) {
      if (pageEl && modifiers) {
        Object.keys(modifiers).forEach((hideCss) => {
          const hideCssEL = pageEl.querySelector('.' + hideCss); //额外隐藏的元素
          if (hideCssEL) hideCssEL.style.display = visible ? '' : 'none';
        });
      }
      el.childNodes.forEach((item) => {
        if (item && item.style) item.style.display = visible ? '' : 'none';
      });
    }

    el.handlerResize();
    el.changeStore = useLayoutStore().change;
    watch([() => el.changeStore?.layoutContentSize, () => el.changeStore?.windowSize], (value) => {
      if (el.changeStore) el.handlerResize();
    });
  },
  beforeUnmount(el, binding) {
    el.changeStore = null;
  },
};
