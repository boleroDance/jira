import React from "react";
import { useState } from "react";
import { List } from './list'
import { SearchPanel } from './search-panel'
import { useHttp } from "utils/http";
import {cleanObject, useDocumentTitle, useMount } from "../../utils"
import useKeywordsDebounce from "../../components/hooks/useKeywordsDebounce"
import styled from "@emotion/styled";
import { ButtonNoPadding, ErrorBox } from "components/lib"
import { useProjectModal } from "./utils";
import { Typography, Button } from "antd";
import { useAsync } from "components/hooks/useAsync";
import { useProjects } from "utils/projects";
import { useUsers } from "utils/user";
import { Row } from "components/lib"
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
  //console.log(retry);
  
  const { open } = useProjectModal()

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
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding onClick={open} type="link">创建项目</ButtonNoPadding>
        {/* { props.projectButton } */}
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam}/>
      <ErrorBox error={error}></ErrorBox>
      <List 
        //refresh={retry} 
        loading={isLoading} 
        users={users || []} 
        dataSource={list || []}
        //projectButton={props.projectButton}
        />
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem
`