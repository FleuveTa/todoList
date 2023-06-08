import { useParams } from "react-router-dom"
import { getTaskByDir } from "../../api/api";
import { useState, useEffect } from "react";
import { Spin } from "antd";
import TaskCard from "./TaskCard";

export default function DirView () {
    const {name} = useParams()
    const [tasks, setTasks] = useState()

    useEffect(() => {
        (async () => {
          const response = await getTaskByDir(name);
          setTasks(response);
        })();
      }, [name]);

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
                <h2>Directory {name} tasks</h2> 
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