import { ref } from 'vue'
import pageContent from '@/components/page-content'
export default function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof pageContent>>()
  function handleQueryClick(queryInfo: any = {}) {
    // console.log(queryInfo)
    pageContentRef.value?.getData(queryInfo)
  }
  return [pageContentRef, handleQueryClick]
}
