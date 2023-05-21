import React, { ChangeEvent } from "react";
import { useState } from "react"
import { User } from "../../@types/user";
import { Form, Select, Input } from "antd";

interface SearchPanelProps {
  users: User[];
  param: {
    name: string;
    personId: string
  };
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
        <Select
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
          
        </Select>
      </Form.Item>
    </Form>
  )
}