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
    const [search, setSearch] = useState("");

    // adding new task
    const addTask = (newTask:string)=>{
        if (!newTask.trim()){
            return;
        }
        const taskObject = {
            id: Date.now(),
            title: newTask,
            completed: false,
        };

        setTasks([...tasks, taskObject]);
    };
    //deleting task
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
    const saveEditedTask = (taskId: number)=>{
        if (!editedText.trim()){
            return;
        }
        const updatedTasks = tasks.map((task) => {

            if (task.id === taskId) {
                return {
                    ...task,
                    title: editedText,
                };
            }
            return task;
        });
        setTasks(updatedTasks);
        setEditingTaskId(null);
        setEditedText("");
    };

    // counting different tasks
    const totalTasks = tasks.length;

    const completedTasks = tasks.filter((task)=> task.completed).length;

    const activeTasks = tasks.filter((task)=> !task.completed).length;

    //filtering tasks
    const filteredTasks = tasks.filter((task) => {

        const matchesSearch = task.title
            .toLowerCase()
            .includes(search.toLowerCase());
        if (filter === "active"){
            return !task.completed && matchesSearch;
        }
        if (filter === "completed"){
            return task.completed && matchesSearch;
        }
        return matchesSearch;
    });

    useEffect(()=> {
       localStorage.setItem(
           "tasks",
           JSON.stringify(tasks)
       );
    },[tasks]);

    // editing tasks
    const [editingTaskId, setEditingTaskId] = useState<number | null> (null);

    const [editedText, setEditedText] = useState("");

  return (
      <div>
          <Header/>
          <TaskInput onAddTask={addTask}/>

          <div>
              <button onClick={() => setFilter("all")}>All</button>


              <button onClick={() => setFilter("active")}>Active</button>


              <button onClick={() => setFilter("completed")}>Completed</button>
          </div>

          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(event)=>
                setSearch(event.target.value)
            }
          />

          <div>
            <p>Total: {totalTasks}</p>
            <p>Completed: {completedTasks} / {totalTasks}</p>
            <p>Active: {activeTasks}</p>
          </div>

          {filteredTasks.map((task) => (

              <div key={task.id}>

                  {editingTaskId === task.id ? (
                      <div>
                      <input
                        value = {editedText}
                        onChange={(event)=>
                            setEditedText(event.target.value)}
                      />

                      <button
                            onClick={()=> saveEditedTask(task.id)}>
                          Save
                      </button>
                      </div>
                  ): (
                      <p>{task.completed ? "✅" : "⬜"} {task.title}</p>
                      )}

                  <button onClick={() => deleteTask(task.id)}>
                      Delete
                  </button>
                  <button onClick={() => toggleTask(task.id)}>
                      Toggle
                  </button>
                  <button onClick={()=>{
                      setEditingTaskId(task.id);
                      setEditedText(task.title);
                  }}>
                      Edit
                  </button>

              </div>
          ))}
      </div>
  )
}

export default App
