import wlRequest from '@/service'
interface IDataType<T = any> {
  code: number
  data: T
}
export function getPageListData(pageUrl: string, queryInfo: any) {
  return wlRequest.post<IDataType>({
    url: pageUrl,
    data: queryInfo
  })
}

export function deletePageData(url: string) {
  return wlRequest.delete<IDataType>({ url })
}

export function createPageData(url: string, newData: any) {
  return wlRequest.post<IDataType>({
    url: url,
    data: newData
  })
}

export function editPageData(url: string, editData: any) {
  return wlRequest.patch<IDataType>({
    url: url,
    data: editData
  })
}
