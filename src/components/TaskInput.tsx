import {useState} from "react";
import "../App.css"

type TaskInputProps ={
    onAddTask: (task: string) => void;
};


function TaskInput({onAddTask}:TaskInputProps){

    const [task, setTask] = useState("");

    const handleAddTask = ()=> {
        onAddTask(task);
        setTask("");
    };

    return(
        <div>
            <input
                className="input-enter"
                value = {task}
                onChange={(event) => setTask(event.target.value)}
                onKeyDown={(event)=>{
                    if (event.key === "Enter"){
                        handleAddTask();
                    }
                }}
                placeholder="Enter task..."
            />
            <button
                className="button"
                onClick={handleAddTask}
                disabled={!task.trim()}
            >Add</button>
        </div>
    )
}

export default TaskInput