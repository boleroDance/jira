import React from "react";
import { User } from "../../@types/user";
import { Project } from "../../@types/project";
import { Dropdown, Menu, Table, Modal } from "antd";
import dayjs from "dayjs";
import { TableProps } from 'antd/es/Table';
import { Link } from 'react-router-dom'
import { Pin } from '../../components/pin'
import { useDeleteProject, useEditProject } from "utils/projects";
import { ButtonNoPadding } from "components/lib"
import { useProjectModal, useProjectsQueryKey } from "./utils";

interface ListProps extends TableProps<Project> {
  users: User[];
  //refresh?: () => void;
  // projectButton: JSX.Element
}

export const List = ({users, ...props}: ListProps) => {

  const { mutate } = useEditProject(useProjectsQueryKey())

  const pinProject = (id: number) => (pin: boolean) => mutate({id, pin})

  

  return <Table 
            pagination={false}
            columns={[
            {
            title: <Pin checked={false} disabled={true}/>,
            render(value, project) {
              return <Pin 
              checked={project.pin} 
              onCheckedChange={pinProject(project.id)}
              />
            }
            }, 
            {
            title: '名称',
            //dataIndex: 'name',
            render(value, project) { 
              return <Link to={`project/${String(project.id)}`}>{project.name}</Link>
            },
            sorter: (a, b) => a.name.localeCompare(b.name)
            }, 
            { 
            title: '部门',
            dataIndex: 'organization'
            },
            {
              title: '负责人',
              render(value, project) {
                return <span>
                  {users.find((user: User) => user.id === project.personId)?.name || '未知'}
                </span>
              }
            },
            {
              title: '创建时间',
              render(value, project) {
                return <span>
                  {project.created? dayjs(project.created).format('YYYY-MM-DD') : '无'}
                </span>
              }
            }, {
              render(value, project) {
                return <More project={project}></More>
              }
            }
          ]} 
          //dataSource={list}
          {...props}
          />
}

const More = ({project}: {project: Project}) => {

  const {startEdit } = useProjectModal()
  // const editProject = (id: number) => startEdit(id)
  const { mutate: deleteProject } = useDeleteProject(useProjectsQueryKey())
  const confirmDeleteProject = (id: number) => {
    Modal.confirm({
      title: '确定要删除这个项目吗?',
      content: '点击确定删除',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        deleteProject(id)
      }
    })
  }
  return <Dropdown overlay={<Menu>
    <Menu.Item 
    onClick={() => startEdit(project.id)}
    key={'edit'}
    >
    {/* { props.projectButton } */}
         编辑
    </Menu.Item>
    <Menu.Item onClick={() => confirmDeleteProject(project.id)} key={'delete'}>
        删除
    </Menu.Item>
  </Menu>}>
    <ButtonNoPadding  type="link">...</ButtonNoPadding>
  </Dropdown>
}