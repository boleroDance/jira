import React from 'react'
import { useDocumentTitle } from 'utils'
import { useKanban } from 'utils/kanban'
import { useKanbanSearchParams, useProjectInUrl, useTasksSearchParams } from './utils'
import { KanbanColumn } from './kanban-column'
import styled from '@emotion/styled'
import { SearchPanel } from './search-panel'
import { useTasks } from 'utils/tasks'
import { Spin } from 'antd'

export const BoardScreen = () => {
  useDocumentTitle('看板列表')
  const { data: currentProject } = useProjectInUrl()
  const { data: kanbans, isLoading: kanbanIsLoading } = useKanban(useKanbanSearchParams())
  const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams())
  const isLoading = taskIsLoading || kanbanIsLoading

  return <ScreenContainer>
    <h1>{currentProject?.name}看板</h1>
    <SearchPanel />
    {
      isLoading? <Spin size={"large"}/> : <ColumnsContainer>
      {
        kanbans?.map(kanban => <KanbanColumn kanban={kanban} key={kanban.id} />)
      }
    </ColumnsContainer>
    }
    
    
  </ScreenContainer>
}

const ScreenContainer = styled.div`
  padding: 3.2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`

const ColumnsContainer = styled.div`
  display: flex;
  margin-top: 2rem;
  flex: 1;
`