import React from 'react'
import { useDocumentTitle } from 'utils'
import { useKanban } from 'utils/kanban'
import { useKanbanSearchParams, useProjectInUrl } from './utils'
import { KanbanColumn } from './kanban-column'
import styled from '@emotion/styled'
import { SearchPanel } from './search-panel'

export const BoardScreen = () => {
  useDocumentTitle('看板列表')
  const { data: currentProject } = useProjectInUrl()
  const { data: kanbans } = useKanban(useKanbanSearchParams())
  return <div>
    <h1>{currentProject?.name}看板</h1>
    <SearchPanel />
    <ColumnsContainer>
      {
        kanbans?.map(kanban => <KanbanColumn kanban={kanban} key={kanban.id} />)
      }
    </ColumnsContainer>
    
  </div>
}

const ColumnsContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 2rem;
`