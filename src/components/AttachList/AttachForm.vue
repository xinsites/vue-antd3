<template>
  <x-modal
      :title="title"
      :width="500"
      v-model:visible="visible"
      @ok="handleSubmit">
    <a-form ref="formRef" :model="form" :rules="rules" :label-col="{ flex: '90px' }" :wrapper-col="{ flex: '1' }" style="padding: 0px 20px">
      <a-form-item label="上传文件" name="filePath">
        <x-upload
            v-model:value="form.filePath"
            :accept="accept"
            :host="host"
            listType="text"
            :maxCount="maxCount"
            :maxSize="maxSize"
            :disabled="maxCount > 0 ? false : true"
            :dragSort="maxCount > 1 ? true : false"
            :multiple="maxCount > 1 ? true : false"/>
      </a-form-item>
    </a-form>
  </x-modal>
</template>

<script lang="ts">
import {formUtil} from "xin-antd3-ui";

export default defineComponent({
  name: 'AttachForm',
  emits: ['ok'],
  props: {
    accept: String,
    host: String,
    maxCount: Number,
    maxSize: Number,
  },
  setup(props, {emit, slots}) {
    const title = ref<string>();
    const visible = ref<boolean>(false);
    const formRef = ref(null);

    const {form, loadFields, resetFields} = formUtil({
      filePath: undefined,
    });

    // 表单验证规则
    const rules = reactive({
      filePath: [{required: true, type: 'string', message: '请选择文件！', trigger: 'blur'}],
    });

    const openDialog = (modalTitle: string) => {
      resetFields();
      title.value = modalTitle;
      visible.value = true;
    };

    const handleSubmit = () => {
      formRef.value.validate().then(() => {
        visible.value = false;
        emit('ok', JSON.parse(form.filePath));
      });
    };

    return {visible, title, formRef, form, rules, openDialog, handleSubmit};
  },
  methods: {},
});
</script>
<style lang="less" scoped></style>
