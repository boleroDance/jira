import { useCallback, useEffect } from "react"
import { cleanObject } from "./index"
import { useHttp } from "utils/http";
import { useAsync } from "components/hooks/useAsync";
import { Project } from "@types/project";
import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
// import { useProjectsSearchParams } from "screens/project-list/utils";
import { useAddConfig, useDeleteConfig, useEditConfig } from "./use-optimistic-options";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  
  // const { run, ...result } = useAsync<Project[]>()

  // const fetchProjects = useCallback(() => client(`projects`, { data: cleanObject(param || {}) }), [client, param])

  // useEffect(() => {
  //   run(
  //     fetchProjects(),
  //     {
  //       retry: fetchProjects
  //     }
  //   )
  // }, [param, fetchProjects, run])

  // return result

  return useQuery<Project[], Error>(['projects', cleanObject(param)], () => 
  client(`projects`, { data: param }))
}


export const useEditProject = (queryKey: QueryKey) => {
  // const { run, ...asyncResult } = useAsync()
  // const client = useHttp()
  // const mutate = (params: Partial<Project>) => {
  //   return run(client(`projects/${params.id}`, {
  //     data: params,
  //     method: 'PATCH'
  //   }))
  // }

  // return {
  //   mutate,
  //   ...asyncResult
  // }
  const client = useHttp()
  //const queryClient = useQueryClient()
  //const [searchParams] = useProjectsSearchParams()
  //const queryKey = ['projects', searchParams]
  return useMutation(
    (params: Partial<Project>) => client(`projects/${params.id}`, {
    data: params,
    method: 'PATCH'
    }), 
    useEditConfig(queryKey)
    // {
    //   onSuccess: () => queryClient.invalidateQueries('projects'),
    //   async onMutate(target: Partial<Project>) {
    //     // 备份修改前的数据到本地缓存中
    //     const previousItems = queryClient.getQueriesData(queryKey)
    //     queryClient.setQueriesData(queryKey, (old?: Project[]) => {
    //       return old?.map(project => project.id === target.id ? {...project, ...target} : project) || []
    //     })
    //     return { previousItems }
    //   },
    //   onError: (error, newItem, context) => {
    //     // 还原修改前的数据
    //     queryClient.setQueriesData(queryKey, context?.previousItems)
    //   }
    // }
  )

}

export const useAddProject = (queryKey: QueryKey) => {
  // const { run, ...asyncResult } = useAsync()
  // const client = useHttp()
  // const mutate = (params: Partial<Project>) => {
  //   return run(client(`projects/${params.id}`, {
  //     data: params,
  //     method: 'POST'
  //   }))
  // }

  // return {
  //   mutate,
  //   ...asyncResult
  // }

  const client = useHttp()
  const queryClient = useQueryClient()
  return useMutation(
    (params: Partial<Project>) => client(`projects`, {
      data: params,
      method: 'POST'
    }),
    useAddConfig(queryKey)
  )
}

export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    (id: number) => client(`projects/${id}`, {
      method: 'DELETE'
    }),
    useDeleteConfig(queryKey)
  )
}

export const useProject = (id?: number) => {
  const client = useHttp()
  return useQuery<Project>(
    ['project', {id}],
    () => client(`projects/${id}`),
    {
      enabled: !!id
    }
  )
}