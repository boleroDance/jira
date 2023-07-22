import { useForm } from "antd/lib/form/Form";
import React, { useEffect } from "react";
import { useTaskModal, useTasksQueryKey } from "./utils";
import { useEditTask } from "utils/tasks";
import { Form, Input, Modal } from "antd";
import { UserSelect } from "components/user-select";
import { TaskTypeSelect } from "components/task-type-select";

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16}
}

export const TaskModal = () => {
    const [form] = useForm()
    const { editingTaskId, editingTask, close} = useTaskModal()
    const {mutateAsync: editTask, isLoading: editLoading} = useEditTask(useTasksQueryKey())
    

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
    </Modal>
}