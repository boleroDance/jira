import React from "react";
import { User } from "../../@types/user";
import { Project } from "../../@types/project";
import { Table } from "antd";
import dayjs from "dayjs";
import { TableProps } from 'antd/es/Table';

interface ListProps extends TableProps<Project> {
  users: User[];
}

export const List = ({users, ...props}: ListProps) => {
  return <Table 
            pagination={false} 
            columns={[{
            title: '名称',
            dataIndex: 'name',
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
            }
          ]} 
          //dataSource={list}
          {...props}
          />
}