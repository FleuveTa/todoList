import { getImportantTask} from "../../api/api";
import { useState, useEffect, useContext } from "react";
import { TaskContext } from "../Layout/MainLayout";
import { Spin } from "antd";
import TaskCard from "./TaskCard";

export default function ImportantTask () {
    const [tasks, setTasks] = useState()
    // const { tasks, addTask } = useContext(TaskContext);

    // console.log(tasks)

    // const [imTasks, setImTasks] = useState(tasks.filter((task) => task.important === 1))

    useEffect(() => {
        (async () => {
          const response = await getImportantTask();
          setTasks(response);
        })();
      }, []);

    //tasks.map((item) => console.log(item.important))

    const handleDelete = (id) => {
        const updatedCards = tasks.filter((task) => task.id !== id);
        setTasks(updatedCards);
      };

    return (
        <div
            style={{
                marginLeft: 20,
            }}
        >
            {!tasks ? 
            (<Spin />) 
            : 
            (
            <div className="card-container">
                <h1>Important tasks</h1> 
                <div className="card">
                    {tasks.map((item) => (
                        <TaskCard key={item.id} title={item.title} description={item.description} date={item.create_date} id={item.id} onDelete={handleDelete} important={item.important} completed={item.completed} />
                        )
                    )
                }
                </div>   
            </div>
            ) }
            
        </div>
    )
}