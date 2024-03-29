import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Routes, Route, Navigate } from  'react-router'
import { BoardScreen } from 'screens/board'
import { EpicScreen } from 'screens/epic'
import styled from "@emotion/styled";
import { Menu } from "antd";

const useRouteType = () => {
  const units = useLocation().pathname.split('/')
  return units[units.length - 1]
}

export const ProjectScreen = () => {
  
  const routeType = useRouteType()

  return <Container>
    <Aside>
    <Menu mode={"inline"} selectedKeys={[routeType]}>
      <Menu.Item key={'kanban'}>
        <Link to={'kanban'}>看板</Link>
      </Menu.Item>
      <Menu.Item key={'epic'}>
        <Link to={'epic'}>任务组</Link>
      </Menu.Item>
    </Menu> 
    </Aside>
    <Main>
      <Routes>
        <Route path={'kanban'} element={<BoardScreen />} />
        <Route path={'epic'} element={<EpicScreen />} />
        {/* <Navigate to={window.location.pathname + '/board'}/> */}
        <Route index element={<BoardScreen />} />
      </Routes>
    </Main>
    
  </Container>
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  overflow: hidden;
`

const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`
const Main = styled.div`
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  ovrflow: hidden;
`