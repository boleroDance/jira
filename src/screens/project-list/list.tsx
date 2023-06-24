import React from "react";
import { User } from "../../@types/user";
import { Project } from "../../@types/project";
import { Dropdown, Menu, Table } from "antd";
import dayjs from "dayjs";
import { TableProps } from 'antd/es/Table';
import { Link } from 'react-router-dom'
import { Pin } from '../../components/pin'
import { useEditProject } from "utils/projects";
import { ButtonNoPadding } from "components/lib"
import { useProjectModal } from "./utils";

interface ListProps extends TableProps<Project> {
  users: User[];
  //refresh?: () => void;
  // projectButton: JSX.Element
}

export const List = ({users, ...props}: ListProps) => {

  const { mutate } = useEditProject()

  const pinProject = (id: number) => (pin: boolean) => mutate({id, pin})

  const {startEdit } = useProjectModal()
  // const editProject = (id: number) => startEdit(id)

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
              return <Link to={`${project.id.toString()}`}>{project.name}</Link>
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
                return <Dropdown overlay={<Menu>
                  <Menu.Item 
                  onClick={() => startEdit(project.id)}
                  key={'edit'}
                  >
                  {/* { props.projectButton } */}
                       编辑
                  </Menu.Item>
                  <Menu.Item key={'delete'}>
                      删除
                  </Menu.Item>
                </Menu>}>
                  <ButtonNoPadding  type="link">...</ButtonNoPadding>
                </Dropdown>
              }
            }
          ]} 
          //dataSource={list}
          {...props}
          />
}