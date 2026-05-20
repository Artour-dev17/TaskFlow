import Header from "./components/Header";
import TaskInput from "./components/TaskInput";
import { useEffect, useState } from "react";

type Task = {
    id: number;
    title: string;
    completed: boolean;
}
function App() {


    const [tasks, setTasks] = useState<Task[]>(() =>{
        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks){
            return JSON.parse(savedTasks);
        }
        return [];
    });

    const [filter, setFilter] = useState("all");

    const addTask = (newTask:string)=>{
        const taskObject = {
            id: Date.now(),
            title: newTask,
            completed: false,
        };

        setTasks([...tasks, taskObject]);
    };

    const deleteTask = (taskId : number) => {
      const filteredTasks = tasks.filter(
          (task) => task.id !== taskId
      );
      setTasks(filteredTasks);
    };

    const toggleTask = (taskId: number) => {
        const updatedTask = tasks.map((task) => {
            if (task.id === taskId){
                return {
                    ...task,
                    completed: !task.completed,
                };
            }
            return task;
        });
        setTasks(updatedTask);
    }

    const filteredTasks = tasks.filter((task) => {
        if (filter === "active"){
            return !task.completed;
        }
        if (filter === "completed"){
            return task.completed;
        }
        return true;
    });

    useEffect(()=> {
       localStorage.setItem(
           "tasks",
           JSON.stringify(tasks)
       );
    },[tasks]);

  return (
      <div>
          <Header/>
          <TaskInput onAddTask={addTask}/>

          <div>
              <button onClick={() => setFilter("all")}>All</button>


              <button onClick={() => setFilter("active")}>Active</button>


              <button onClick={() => setFilter("completed")}>Completed</button>
          </div>
          {filteredTasks.map((task) => (

              <div key={task.id}>
                  <p>{task.completed ? "✅" : "⬜"} {task.title}</p>
                  <button onClick={() => deleteTask(task.id)}>
                      Delete
                  </button>
                  <button onClick={() => toggleTask(task.id)}>
                      Toggle
                  </button>

              </div>
          ))}
      </div>
  )
}

export default App
