import {Card, Divider,Button} from 'antd'
import moment from 'moment'
import { NavLink } from 'react-router-dom'

export default function TaskCard ({title, description, date }) {
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
        </Card>
    )

}