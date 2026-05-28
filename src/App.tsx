import Header from "./components/Header";
import TaskInput from "./components/TaskInput";
import { useEffect, useState } from "react";
import TaskItem from "./components/TaskItem";
import type { Task } from "./types/task";
import './App.css';

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
      <div className="app">

                <Header />


          <TaskInput  onAddTask={addTask}/>

          <div className="controls">
              <button className="button" onClick={() => setFilter("all")}>All</button>


              <button className="button" onClick={() => setFilter("active")}>Active</button>


              <button className="button" onClick={() => setFilter("completed")}>Completed</button>
          </div>

          <input
            className="search-input"
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(event)=>
                setSearch(event.target.value)
            }
          />

          <div className="stats">
            <p>Total: {totalTasks}</p>
            <p>Completed: {completedTasks} / {totalTasks}</p>
            <p>Active: {activeTasks}</p>
          </div>

          {filteredTasks.length === 0 ? (
                  <p>
                      {tasks.length === 0
                          ? "Add your first task"
                          : "No tasks found"}
                  </p>
              ) : (
                  filteredTasks.map((task) => (
                      <TaskItem
                          key={task.id}
                          task={task}
                          editingTaskId={editingTaskId}
                          editedText={editedText}
                          setEditedText={setEditedText}
                          deleteTask={deleteTask}
                          toggleTask={toggleTask}
                          setEditingTaskId={setEditingTaskId}
                          saveEditedTask={saveEditedTask}
                      />
          )))}
      </div>
  )
}

export default App
