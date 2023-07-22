import React, { useEffect, useState } from 'react'
import { useAddTask } from 'utils/tasks'
import { useProjectIdInUrl, useTasksQueryKey } from './utils'
import { Card, Input } from 'antd'

interface Iprops {
    kanbanId: number
}

export const CreactTask = ({kanbanId}: Iprops) => {
    const [name, setName] = useState('')
    const {mutateAsync: addTask} = useAddTask(useTasksQueryKey())

    const projectId = useProjectIdInUrl()

    const [inputmode, setInputmode] = useState(false)

    const submit =  async () => {
        await addTask({projectId, name, kanbanId})
        setInputmode(false)
        setName('')
    }

    const toggle = () => {
        setInputmode(mode => !mode)
    }

    useEffect(() => {
        if(!inputmode) {
            setName('')
        }
    }, [inputmode])


    if (!inputmode) {
        return <div onClick={toggle}>
            +创建事务
        </div>
    }

    return <Card>
        <Input onBlur={toggle} 
        placeholder='需要做些什么' 
        autoFocus={true}
        onPressEnter={submit}
        value={name}
        onChange={evt => setName(evt.target.value)}
        />
    </Card>
}