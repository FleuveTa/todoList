import {Card, Button, Popconfirm} from 'antd'
import moment from 'moment'
import { NavLink } from 'react-router-dom'
import {
    DeleteOutlined,
    StarOutlined,
    StarFilled
    } from '@ant-design/icons';

import { useState } from 'react'
import { fetchAPIDeleteTask } from '../../api/api';

export default function TaskCard ({title, description, date, id }) {
    const [buttonContent, setButtonContent] = useState('Completed')
    const [buttonContentColor, setButtonContentColor] = useState('green')
    const [important, setimportant] = useState(<StarOutlined />)

    const completeTask = () => {
        if (buttonContent === 'Completed') {
            setButtonContent('UnCompleted')
            setButtonContentColor('red')
        } 
        else {
            setButtonContent('Completed')
            setButtonContentColor('green')
        } 
    }

    const switchImportant = () => {
        if (important === <StarOutlined /> ) {
            setimportant(<StarFilled />)
        } 
        else {
            setimportant(<StarOutlined />)
        } 
    }

    const deleteTask = async (task_id) => {
        const res = await fetchAPIDeleteTask(task_id)
        const response = await res.json()
        return response
    }

    return (
        <Card
            title={title}
            extra={<NavLink to={`/dir/giang`}><Button>Giang</Button></NavLink>}
            style={{
            width: 300,
            }}  
        >
            <p>{description}</p>
            <p>{moment(date).format('YYYY-MM-DD')}</p>
            <Button className='complete' style={{ background: buttonContentColor, borderColor: "yellow" }} onClick={completeTask}>{buttonContent}</Button>
            <Button onClick={switchImportant}>{important}</Button>
            <Popconfirm title='Delete task' description='Are you sure' onConfirm={()=>deleteTask(id)}><DeleteOutlined /></Popconfirm>
        </Card>
    )

}