import {useState} from "react";

function TaskInput(){

    const [task, setTask] = useState("");

    return(
        <div>
            <input
                value = {task}
                onChange={(event) => setTask(event.target.value)}
                placeholder="Enter task..."
            />
            <p>{task}</p>
            <button>Add</button>
        </div>
    )
}

export default TaskInput