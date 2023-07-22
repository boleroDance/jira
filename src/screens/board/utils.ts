import { useLocation } from "react-router-dom"
import { useProject } from "utils/projects"
import { useUrlQueryParam } from "utils/url"
import { useCallback, useMemo } from "react"
import { useTask } from "utils/tasks"

export const useProjectIdInUrl = () => {
  const {pathname} = useLocation()
  const id = pathname.match(/projects\/(\d+)/)?.[1]
  return Number(id)
}

export const useProjectInUrl = () => useProject(useProjectIdInUrl())

export const useKanbanSearchParams = () => ({projectId: useProjectIdInUrl()})

export const useKanbansQueryKey = () => ['kanbans', useKanbanSearchParams()]

export const useTasksSearchParams = () => {
  const [param, setParam] = useUrlQueryParam([
    'name',
    'typeId',
    'processorId',
    'tagId'
  ])
  const projectId = useProjectIdInUrl()
  return useMemo(() => ({ 
    projectId,
    typeId: Number(param.typeId) || undefined,
    processorId: Number(param.processorId) || undefined,
    tagId: Number(param.tagId) || undefined,
    name: param.name
  }), [projectId, param])
}

export const useTasksQueryKey = () => ['tasks', useTasksSearchParams()]

export const useTaskModal = () => {
  const [{editingTaskId}, setEditingTaskId] = useUrlQueryParam(['editingTaskId'])
  const { data: editingTask, isLoading} = useTask(Number(editingTaskId))
  const startEdit = useCallback((id: number) => {
    setEditingTaskId({editingTaskId: id})
  }, [setEditingTaskId])
  const close = useCallback(() => {
    setEditingTaskId({editingTaskId: ''})
  }, [editingTaskId])

  return {
    editingTaskId,
    editingTask,
    startEdit,
    close,
    isLoading
  }
}