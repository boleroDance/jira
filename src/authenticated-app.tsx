import styled from "@emotion/styled";
import React, {useState} from "react";
import { Row } from "components/lib"
import { Navigate, Route, Routes } from "react-router";
import { ProjectListScreen } from "screens/project-list";
import { ProjectScreen } from "screens/project"
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
import { Dropdown, Menu, Button } from "antd";
import { useAuth } from "context/auth-context";
import { resetRoute } from "./utils"
import { ProjectModal } from "screens/project-list/ProjectModal"
import { ProjectPopover } from "components/project-popover";

export default function AuthenticatedApp() {

  const [projectModalOpen, setProjectModalOpen] = useState(false)

  return (
    // <Routes>
    //       <Route path={"projects"} element={<ProjectListScreen />} />
    // </Routes>
    <Container>
      <PageHeader setProjectModalOpen={setProjectModalOpen} />
      {/* <Nav>nav</Nav> */}
      <Main>
        <Routes>
          <Route path={'projects'} element={<ProjectListScreen setProjectModalOpen={setProjectModalOpen}/>} />
          <Route path={'projects/:projectId/*'} element={<ProjectScreen />}/>
          <Route path="*" element={<Navigate to="/projects" replace={true}/>} />  
        </Routes>
      </Main>
      {/* <Aside>aside</Aside>
      <Footer>footer</Footer> */}
      <ProjectModal projectModalOpen={projectModalOpen} onClose={() => setProjectModalOpen(false)}/>
    </Container>
  )
}


const PageHeader = (props: { setProjectModalOpen: (isOpen: boolean) => void }) => {
  return <Header between={true}>
    <HeaderLeft style={{width: 400, display: 'flex', justifyContent: 'space-evenly'}} gap={true}>
      <Button type="link" onClick={resetRoute}>
        <SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'} />
      </Button>
      <ProjectPopover setProjectModalOpen={props.setProjectModalOpen}/>
      <span>用户</span>
    </HeaderLeft>
    <HeaderRight>
      
      <User />
    </HeaderRight>
  </Header>
}

const User = () => {
  const { logout, user } = useAuth()
  return <Dropdown overlay={<Menu>
    <Menu.Item key={'logout'}>
      <Button onClick={logout} type={"link"}>登出</Button>
    </Menu.Item>
  </Menu>}>
    <Button onClick={e => e.preventDefault()} type={"link"}>Hi, {user.name}</Button>
  </Dropdown>
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`

const HeaderLeft = styled(Row)``

const HeaderRight = styled.div``

const Main = styled.main``

// const Nav = styled.nav`
//   grid-area: nav;
// `
// const Aside = styled.nav`
// grid-area: aside;
// `

// const Footer = styled.nav`
// `



