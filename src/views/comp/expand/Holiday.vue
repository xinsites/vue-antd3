<template>
  <div :class="['xin-page-full']">
    <a-card :bordered="false" title="节假日">
      <x-calendar ref="holidayRef" :monthData="monthData" @panelChange="panelChange">
        <template #dateCellRender="{ current, data, isCurMonth }">
          <div style="margin-top: 4px;" v-if="data && isCurMonth">
            <a-checkbox v-model:checked="data.holiday" :disabled="data.workday">
              <span class="holiday">节假日</span>
            </a-checkbox>
          </div>
          <div style="margin-top: 8px;" v-if="data && isCurMonth">
            <a-checkbox v-model:checked="data.workday" :disabled="data.holiday">
              <span class="workday">调休日</span>
            </a-checkbox>
          </div>
        </template>
      </x-calendar>
      <x-button type="primary" style="margin: 12px 12px 0px 0px;" @click="handleSave">保存</x-button>
      <x-button type="primary" @click="handleReset">重置</x-button>
    </a-card>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";

export default defineComponent({
  setup() {
    const holidayRef = ref(null);
    const monthData = ref([]);

    const panelChange = (currentYear, currentMonth) => {
      console.log('panelChange===', currentYear, currentMonth);
      const list = [];
      const month = String(currentMonth + 1).padStart(2, '0');
      list.push({
        date: `${currentYear}-${month}-03`,
        holiday: true,
      });
      list.push({
        date: `${currentYear}-${month}-04`,
        workday: true,
      });
      monthData.value = list;
      // holidayRef.value?.setMonthData(list);
    }

    const handleSave = () => {
      console.log('handleSave===', holidayRef.value?.getMonthData());
    }

    const handleReset = () => {
      holidayRef.value?.setCurrentDate();
      const list = [{date: `2026-02-05`, workday: true}];
      monthData.value = list;
    }

    return {holidayRef, monthData, panelChange, handleSave, handleReset};
  },
  methods: {},
});
</script>

<style lang="less" scoped>

</style>
