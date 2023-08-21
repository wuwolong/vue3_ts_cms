<template>
  <div class="wl-form">
    <slot name="header"></slot>
    <el-form label-width="120px">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              :label="item.label"
              :style="itemStyle"
              v-if="!item.isHidden"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                ></el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    v-bind="option"
                  >
                  </el-option>
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  type="datetimerange"
                  :="item.otherOptions"
                  :default-time="defaultTime1"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <slot name="footer"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IFormItem } from '../type'
// import emitter from '@/utils/use-mitter'
export default defineComponent({
  props: {
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => {
        return []
      }
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: '10px 40px' })
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // >1920px 4个
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    },
    modelValue: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const defaultTime1 = new Date(2000, 1, 1, 12, 0, 0)

    // emitter.on('resetFormDate', (value: any) => {
    //   console.log(value)
    //   formData.value = { ...value }
    // })
    // const formData = ref()
    // const formData = computed(() => {
    //   return { ...props.modelValue }
    // })
    // const formData = computed({
    //   get() {
    //     return props.modelValue
    //   },
    //   set(value) {
    //     // console.log(1111)
    //     emit('update:modelValue', value)
    //   }
    // })
    function handleValueChange(value: any, field: any) {
      emit('update:modelValue', { ...props.modelValue, [field]: value })
    }
    // watch(
    //   formData,
    //   (value) => {
    //     // console.log(value === oldValue)
    //     emit('update:modelValue', value)
    //   },
    //   { deep: true }
    // )
    return { defaultTime1, handleValueChange }
  }
})
</script>

<style scoped lang="less">
.wl-form {
  padding-top: 22px;
}
</style>
