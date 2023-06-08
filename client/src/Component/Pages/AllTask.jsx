import { getAllTask } from "../../api/api";
import TaskCard from "./TaskCard";
import { useState, useEffect } from "react";
import { Spin } from "antd";
import './card.css'


export default function AllTask () {
    const [tasks, setTasks] = useState()

    useEffect(() => {
        (async () => {
          const response = await getAllTask();
          setTasks(response);
        })();
      }, []);


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
            <div className="card-container" >
                <h2>All tasks</h2> 
                <div className="card" style={{ display: 'flex', flexWrap: 'wrap' }}>
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