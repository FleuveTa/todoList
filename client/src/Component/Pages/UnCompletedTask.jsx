import { getUnCompletedTask } from "../../api/api";
import { useState, useEffect } from "react";
import { Spin } from "antd";
import TaskCard from "./TaskCard";

export default function UncompletedTask () {
    const [tasks, setTasks] = useState()

    useEffect(() => {
        (async () => {
          const response = await getUnCompletedTask();
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
                <h1>Uncompleted tasks</h1> 
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