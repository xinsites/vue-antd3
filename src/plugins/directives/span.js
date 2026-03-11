/**
 * 指令使用于a-row，更精确的响应式布局，根据a-row宽度从大到小依次匹配设置的参数，再根据该参数决定每行显示的a-col数
 * 指令v-span参数说明，col24：24列宽度;col12：12列宽度;col8：8列宽度;col6：6列宽度;col4：4列宽度;col3：3列宽度;col2：2列宽度;col1：1列宽度;notCss：不计算在内的样式
 * 例如：v-span="{ col3: 600, col2: 400 }"，当a-row宽度>600时3列布局，当a-row宽度>400时2列布局，没有1列布局
 * 例如：v-span="{ col2: 420, col1: 0 }"，当a-row宽度>420时2列布局，当a-row宽度>0时1列布局
 */
export const span = {
  mounted(el, binding) {
    // el为绑定的元素，binding为绑定给指令的对象
    let width = 0;
    let col24Width, col12Width, col8Width, col6Width, col4Width, col3Width, col2Width, col1Width; //24列、12列、8列、6列、4列、3列、2列、1列最小宽度
    const flagCss = 'ant-col-layout';

    setCssFlag();

    //响应式布局打上标记
    function setCssFlag() {
      if (typeof binding.value == 'object') {
        Object.keys(binding.value).forEach((key) => {
          if (key == 'col24') col24Width = Number(binding.value[key]);
          else if (key == 'col12') col12Width = Number(binding.value[key]);
          else if (key == 'col8') col8Width = Number(binding.value[key]);
          else if (key == 'col6') col6Width = Number(binding.value[key]);
          else if (key == 'col4') col4Width = Number(binding.value[key]);
          else if (key == 'col3') col3Width = Number(binding.value[key]);
          else if (key == 'col2') col2Width = Number(binding.value[key]);
          else if (key == 'col1') col1Width = Number(binding.value[key]);
        });
        const wrapperEls = el.childNodes;
        const notCss = binding.value['notCss'];
        wrapperEls.forEach((wrapEl) => {
          if (!(notCss && wrapEl.classList?.contains(notCss))) {
            if (wrapEl.classList?.contains('ant-col')) wrapEl.classList.add(flagCss);
          }
        });
      }
    }

    function changeWidth() {
      if (el.offsetWidth == 0) return;
      if (width !== el.offsetWidth) {
        let span = null;
        if (typeof col24Width != 'undefined' && el.offsetWidth > col24Width) span = 1; //24列
        else if (typeof col12Width != 'undefined' && el.offsetWidth > col12Width) span = 2; //12列
        else if (typeof col8Width != 'undefined' && el.offsetWidth > col8Width) span = 3; //8列
        else if (typeof col6Width != 'undefined' && el.offsetWidth > col6Width) span = 4; //6列
        else if (typeof col4Width != 'undefined' && el.offsetWidth > col4Width) span = 6; //4列
        else if (typeof col3Width != 'undefined' && el.offsetWidth > col3Width) span = 8; //3列
        else if (typeof col2Width != 'undefined' && el.offsetWidth > col2Width) span = 12; //2列
        else if (typeof col1Width != 'undefined' && el.offsetWidth > col1Width) span = 24; //1列

        if (span != null) {
          const wrapperEls = el.querySelectorAll('.' + flagCss);
          wrapperEls.forEach((wrapEl) => {
            wrapEl.className = `ant-col ant-col-${span} ${flagCss}`;
          });
        }
      }
      width = el.offsetWidth;
    }

    if (typeof binding.value == 'object') {
      changeWidth();
      el.interval = setInterval(changeWidth, 300);
    }
  },
  beforeUnmount(el, binding) {
    clearInterval(el.interval); //解绑
  },
};
