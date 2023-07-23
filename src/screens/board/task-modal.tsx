import { useForm } from "antd/lib/form/Form";
import React, { useEffect } from "react";
import { useTaskModal, useTasksQueryKey } from "./utils";
import { useEditTask } from "utils/tasks";
import { Button, Form, Input, Modal } from "antd";
import { UserSelect } from "components/user-select";
import { TaskTypeSelect } from "components/task-type-select";
import { useDeleteTask } from "utils/kanban";

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16}
}

export const TaskModal = () => {
    const [form] = useForm()
    const { editingTaskId, editingTask, close} = useTaskModal()
    const {mutateAsync: editTask, isLoading: editLoading} = useEditTask(useTasksQueryKey())
    const {mutateAsync: deleteTask} = useDeleteTask(useTasksQueryKey())

    const onCancel = () => {
        close()
        form.resetFields()
    }

    const onOk = async () => {
        await editTask({...editingTask, ...form.getFieldsValue()})
        close()
    }

    useEffect(() => {
        form.setFieldsValue(editingTask)
    }, [form, editingTask])

    const startDelete = () => {
        Modal.confirm({
          okText: '确定',
          cancelText: '取消',
          title: '确定删除任务吗？',
          onOk() {
            deleteTask({id: Number(editingTaskId)})
            close()
          }
        })
      }

    return <Modal 
    forceRender={true}
    title={'编辑任务'} 
    okText={'确认'} 
    cancelText={'取消'} 
    confirmLoading={editLoading}
    visible={!!editingTaskId}
    onCancel={onCancel}
    onOk={onOk}
    >
        <Form {...layout} 
        initialValues={editingTask} 
        form={form}
        >
            <Form.Item label={'任务名'} name={'name'} rules={[
                {required: true, message: '请输入任务名称'}
            ]}>
                <Input />
            </Form.Item>
            <Form.Item label={'经办人'} name={'processorId'} >
                <UserSelect defaultOptionName="经办人"/>
            </Form.Item>
            <Form.Item label={'类型'} name={'typeId'} >
                <TaskTypeSelect />
            </Form.Item>
        </Form>

        <div style={{textAlign: 'right'}}>
            <Button onClick={startDelete} type='link' size="small">删除</Button>
        </div>
    </Modal>
}