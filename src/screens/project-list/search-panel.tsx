import React, { ChangeEvent } from "react";
import { useState } from "react"
import { User } from "../../@types/user";
import { Project } from "../../@types/project";
import { Form, Select, Input } from "antd";
import { UserSelect } from "../../components/user-select"

interface SearchPanelProps {
  users: User[];
  param: Pick<Project, 'name' | 'personId'>;
  setParam: (param: SearchPanelProps['param']) => void
}

export const SearchPanel = ({users, param, setParam}: SearchPanelProps) => {

  return (
    <Form style={{marginBottom: '2rem'}} layout={"inline"}>
      <Form.Item>
        <Input
          placeholder="项目名" 
          type="text"
          value={param.name}
          onChange={(evt: ChangeEvent<HTMLInputElement>) => 
            setParam({
              ...param,
              name: evt.target.value
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOptionName="负责人" 
          value={param.personId} 
          onChange={value => setParam({
                ...param,
                personId: value
              })}/
        >
        {/* <Select
          value={param.personId}
          onChange={
            value => setParam({
              ...param,
              personId: value
            })
          }
        >
          <Select.Option value={""}>负责人</Select.Option>
          {
            users.map((user: User) => (
              <Select.Option key={user.id} value={user.id}>
                {user.name}
              </Select.Option>
            ))
          }
          
        </Select> */}
      </Form.Item>
    </Form>
  )
}