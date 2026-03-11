/**
 * 元素禁用指令，解决元素 :disabled='false'无用问题
 * v-disabled=‘true’，禁用元素，其他值去掉元素disabled属性
 */
export const disabled = {
  mounted(el, binding) {
    // el为绑定的元素，binding为绑定给指令的对象
  },
  updated(el, binding) {
    if (binding.value === true) {
      el.setAttribute('disabled', 'disabled');
      el.style.pointerEvents = 'none';
      el.style.color = 'var(--disabled-color) !important';
      el.setAttribute('tabindex', '-1'); // 禁止聚焦

      // el.addEventListener('click', (event) => {
      //   event.preventDefault(); // 阻止默认行为
      //   event.stopPropagation(); // 阻止事件冒泡
      // });
    } else {
      el.removeAttribute('disabled');
      el.style.pointerEvents = 'auto';
      el.style.color = '';
      el.removeAttribute('tabindex');

      // el.addEventListener('click', (event) => {
      //   event.preventDefault(); // 阻止默认行为
      //   event.stopPropagation(); // 阻止事件冒泡
      // });
    }
  },
  beforeUnmount(el, binding) {},
};
