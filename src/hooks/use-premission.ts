import { useStore } from '@/store'
import { computed } from 'vue'
export default function usePremission(
  pageName: string,
  operate: string
): boolean {
  const store = useStore()
  const premissions = computed(() => store.state.loginModule.permissions)
  const constant = `system:${pageName}:${operate}`
  return !!premissions.value.find((item: string) => item === constant)
}
