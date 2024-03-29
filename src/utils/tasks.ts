import { useHttp } from "utils/http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { Task } from "@types/task";
import { useAddConfig, useDeleteConfig, useEditConfig } from "./use-optimistic-options";

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp()
  return useQuery<Task[]>(
    ["tasks", param], () => client("tasks", {data: param})
  )
}

export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp()

  return useMutation(
    (params: Partial<Task>) => 
    client('tasks', {
      data: params,
      method: "POST"
    }),
    useAddConfig(queryKey)
  )
}
/**获取task详情*/
export const useTask = (id?: number) => {
  const client = useHttp()
  return useQuery<Task>(
    ["task", {id}], 
    () => client(`tasks/${id}`),
    {
      enabled: Boolean(id),
    }
  )
}

/**编辑task*/
export const useEditTask = (queryKey: QueryKey) => {
    const client = useHttp()
    return useMutation(
      (params: Partial<Task>) => 
      client(`tasks/${params.id}`, {
        method: 'PATCH',
        data: params
      }),
      useEditConfig(queryKey)
    )
}

/**删除task*/
export const useDeleteTask = (queryKey: QueryKey) => {
    const client = useHttp()

    return useMutation(
      ({id}: {id: number}) => 
      client(`tasks/${id}`, {
        method: 'DELETE',
      }),
      useDeleteConfig(queryKey)
    )
}