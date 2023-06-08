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

    console.log(tasks)


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
                <h1>All tasks</h1> 
                <div className="card">
                    {tasks.map((item) => (
                        <TaskCard key={item.id} title={item.title} description={item.description} date={item.create_date} id={item.id} />
                        )
                    )
                }
                </div>   
            </div>
            ) }
            
        </div>
    )
}