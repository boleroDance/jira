import { useProject } from "utils/projects"
import { useUrlQueryParam } from "utils/url"

export const useProjectModal = () => {
  const [{projectCreate}, setProjectCreate] = useUrlQueryParam([
    'projectCreate'
  ])

  const [{editingProjectId}, setEditingProjectId] = useUrlQueryParam([
    'editingProjectId'
  ])

  const {data: editingProject, isLoading } = useProject(Number(editingProjectId))

  const open = () => setProjectCreate({projectCreate: true})
  const close = () => {
    setProjectCreate({projectCreate: false})
    setEditingProjectId({editingProjectId: undefined})
  }
  const startEdit = (id: number) => setEditingProjectId({editingProjectId: id})

  return {
    projectModalOpen: projectCreate === 'true' || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    editingProject,
    isLoading
  }
}