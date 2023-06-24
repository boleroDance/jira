import { useCallback, useEffect } from "react"
import { cleanObject } from "./index"
import { useHttp } from "utils/http";
import { useAsync } from "components/hooks/useAsync";
import { Project } from "@types/project";
import { useMutation, useQuery, useQueryClient } from "react-query";

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

  return useQuery<Project[], Error>(['projects', param], () => client(`projects`, { data: param }))
}


export const useEditProject = () => {
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
  const queryClient = useQueryClient()
  return useMutation(
    (params: Partial<Project>) => client(`projects/${params.id}`, {
    data: params,
    method: 'PATCH'
    }), {
      onSuccess: () => queryClient.invalidateQueries('projects')
    }
  )

}

export const useAddProject = () => {
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
    }), {
      onSuccess: () => queryClient.invalidateQueries('projects')
    }
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