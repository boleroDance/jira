import React from "react";
import { useState } from "react";
import { List } from './list'
import { SearchPanel } from './search-panel'
import { useHttp } from "utils/http";
import {cleanObject, useDocumentTitle, useMount } from "../../utils"
import useKeywordsDebounce from "../../components/hooks/useKeywordsDebounce"
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useAsync } from "components/hooks/useAsync";
import { useProjects } from "utils/projects";
import { useUsers } from "utils/user";
const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {

  const [param, setParam] = useState({
    name: '',
    personId: ''
  })

  // const client = useHttp();

  // const [users, setUsers] = useState([])

  useDocumentTitle('项目列表', false)
  
  const debounceKeywords = useKeywordsDebounce(param, 1000)
  
  const { isLoading, error, data: list } = useProjects(debounceKeywords)

  const { data: users } = useUsers()

  // useEffect(() => {
  //   run(client(`projects`, {data: cleanObject(debounceKeywords)}))
  //   // client(`projects`, {data: cleanObject(param)})
  //   // .then(setList)
  //   // .catch((error) => {})
  //   // .finally(() => {})
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [debounceKeywords])

  // useMount(() => {
  //   client("users").then(setUsers)
  // })

  // useEffect(() => {
  //   client("users").then(setUsers)
  // }, [])

  return (
    <Container>
      <SearchPanel users={users || []} param={param} setParam={setParam}/>
      {error? <Typography.Text type={"danger"}>{error.message}</Typography.Text> : null}
      <List loading={isLoading} users={users || []} dataSource={list || []}/>
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem
`