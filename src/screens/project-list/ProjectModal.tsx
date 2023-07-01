import React, { useEffect } from "react"
import { Drawer, Button, Spin, Form, Input } from 'antd'
import { useProjectModal, useProjectsQueryKey } from "./utils"
import { UserSelect } from "components/user-select"
import { useAddProject, useEditProject } from "utils/projects"
import { useForm } from "antd/lib/form/Form"
import { ErrorBox } from "components/lib"
import styled from "@emotion/styled"

export const ProjectModal = () => {
  const { projectModalOpen, close, editingProject, isLoading } = useProjectModal()
  const title = editingProject ? '编辑项目': '创建项目'

  const useMutateProject = editingProject ? useEditProject : useAddProject
  const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject(useProjectsQueryKey())

  const [form] = useForm()

  const onFinish = (values: any) => {
    mutateAsync({...editingProject, ...values}).then(() => {
      form.resetFields()
      close()
    })
  }

  useEffect(() => {
    form.setFieldsValue(editingProject)
  }, [editingProject, form])

  return <Drawer 
          width={'100%'}
          visible={projectModalOpen}
          onClose={close}
          forceRender={true}
          >
            <Container>
            {
              isLoading ? <Spin size="large"/> : <>
                <h1>{title}</h1>
                <ErrorBox error={error}/>
                <Form form={form} layout={"vertical"} style={{width: '40rem'}} onFinish={onFinish}>
                  <Form.Item label={'名称'} name={'name'} rules={[
                    {required: true},
                    {message: '请输入项目名'}
                  ]}>
                    <Input placeholder="请输入项目名称"/>
                  </Form.Item>
                  <Form.Item label={'部门'} name={'organization'} rules={[
                    {required: true},
                    {message: '请输入部门名'}
                  ]}>
                    <Input placeholder="请输入部门名称"/>
                  </Form.Item>

                  <Form.Item label={'负责人'} name={'personId'}>
                    <UserSelect defaultOptionName={'负责人'} />
                  </Form.Item>

                  <Form.Item>
                    <Button style={{marginRight: 20}} loading={mutateLoading} htmlType="submit" type="primary">提交</Button>
                    <Button onClick={close}>关闭</Button>
                  </Form.Item>
                </Form>
              </>
            }
            
            </Container>
  </Drawer>
}

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`