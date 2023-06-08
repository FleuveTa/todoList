import {Card, Button, Popconfirm, Switch} from 'antd'
import moment from 'moment'
import { NavLink } from 'react-router-dom'
import {
    DeleteOutlined,
    StarOutlined,
    StarFilled
    } from '@ant-design/icons';

import { useState } from 'react'
import { fetchAPIDeleteTask } from '../../api/api';

export default function TaskCard ({title, description, date, id, onDelete, important, completed }) {
    const [buttonContent, setButtonContent] = useState(completed === 1 ? 'Completed' : 'UnCompleted')
    const [buttonContentColor, setButtonContentColor] = useState(completed === 1 ? 'green' : 'red')
    const [importantCheck, setImportantCheck] = useState(important === 1 ? true : false)

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


    const deleteTask = async (task_id) => {
        const res = await fetchAPIDeleteTask(task_id)
        const response = await res.json()
        onDelete(task_id)
        return response
    }

    const onImChange = (checked) => {
        setImportantCheck(!importantCheck)
      };

    return (
        
        <Card
            title={title}
            //extra={<NavLink to={`/dir/giang`}><Button>Giang</Button></NavLink>}
            style={{
            width: 290,
            background: '#D4CACA', // Change the background color here
            borderColor: '#1A1818',
            }}
            actions={[
                <Popconfirm
                  key="delete"
                  title="Delete task"
                  description="Are you sure?"
                  onConfirm={() => deleteTask(id)}
                >
                  <DeleteOutlined />
                </Popconfirm>,
                //<Button>Edit</Button>
              ]}  
        >
            <p>{description}</p>
            <p>{moment(date).format('YYYY-MM-DD')}</p>
            <Button className='complete' style={{ background: buttonContentColor, borderColor: "yellow" }} onClick={completeTask}>{buttonContent}</Button>
            {/* <br />
            <br /> */}
            <Switch style={{marginLeft: 15}} checked={importantCheck} onChange={onImChange} />
            <label>Important</label>
        </Card>
    )

}