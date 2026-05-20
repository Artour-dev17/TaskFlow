import {useState} from "react";

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
                value = {task}
                onChange={(event) => setTask(event.target.value)}
                placeholder="Enter task..."
            />
            <button onClick={handleAddTask}>Add</button>
        </div>
    )
}

export default TaskInput