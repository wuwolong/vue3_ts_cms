import { ref } from 'vue'
import pageModal from '@/components/page-modal'
type CallBackFn = (item?: any) => void
export default function usePageModal(
  createCbFn?: CallBackFn,
  updateCbFn?: CallBackFn
) {
  const pageModalRef = ref<InstanceType<typeof pageModal>>()
  const defaultInfo = ref({})
  function createUsersData() {
    defaultInfo.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.centerDialogVisible = true
    }
    createCbFn && createCbFn()
  }
  function updateUsersData(value: any) {
    defaultInfo.value = { ...value }
    if (pageModalRef.value) {
      pageModalRef.value.centerDialogVisible = true
    }
    updateCbFn && updateCbFn(value)
  }
  return [pageModalRef, createUsersData, updateUsersData, defaultInfo]
}
