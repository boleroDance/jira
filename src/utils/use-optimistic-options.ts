import { QueryKey, useQueryClient } from "react-query"

export const useConifg = (queryKey: QueryKey, callback: (target: any, old?: any[]) => any[]) => {
  const queryClient = useQueryClient()

  return {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    async onMutate(target: any) {
      const previousItems = queryClient.getQueriesData(queryKey)
      queryClient.setQueryData(queryKey, (old?: any[]) => {
        // return old?.map(project => project.id === target.id ? {...project, ...target} : project) || []
        return callback(target, old)
      })
      return { previousItems }
    },
    onError(error: any, newItem: any, context: any) {
      queryClient.setQueryData(queryKey, context.previousItems)
    }
  }
}

export const useDeleteConfig = (queryKey: QueryKey) => useConifg(queryKey, (target, old) => old?.filter(o => o.id !== target.id) || [])
export const useEditConfig = (queryKey: QueryKey) => useConifg(queryKey, (target, old) => old?.map(o => o.id === target.id? {...o, ...target} : o) || [])
export const useAddConfig = (queryKey: QueryKey) => useConifg(queryKey, (target, old) => old? [...old, target] : [])