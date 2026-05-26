import type { Task } from "../types/task";
import "../App.css";

type TaskItemProps = {
  task: Task;
  editingTaskId: number | null;
  editedText: string;

  setEditedText: (text: string)=> void;

  deleteTask: (taskId: number) => void;
  toggleTask: (taskId: number) => void;

  setEditingTaskId: (
      taskId: number | null
  ) => void;

  saveEditedTask: (task: number) => void;
};

function TaskItem({
                      task,
                      editingTaskId,
                      editedText,
                      setEditedText,
                      deleteTask,
                      toggleTask,
                      setEditingTaskId,
                      saveEditedTask,
                  }: TaskItemProps) {
    return (
        <div className="task-item">
            <div>


            {editingTaskId === task.id ? (
                <div>
                    <input
                        value={editedText}
                        onChange={(event) => setEditedText(
                            event.target.value
                        )}

                        onKeyDown={(event)=>{
                            if (event.key === "Escape"){
                                setEditingTaskId(null);
                                setEditedText("")
                            }
                            if (event.key === "Enter"){
                                saveEditedTask(task.id);
                            }
                        }}
                    />

                    <button className="buttons button" onClick={() => saveEditedTask(task.id)}>
                        Save
                    </button>
                </div>
            ) : (
                <p
                    className={`task-title ${
                        task.completed ? "completed" : ""
                    }`}
                >
                    {task.completed ? "✅" : "⬜"}{" "}
                    {task.title}
                </p>
            )}
            </div>
            <div>


            <div className="buttons">
                <button className="button" onClick={() => deleteTask(task.id)}>
                    Delete
                </button>

                <button className="button" onClick={() => toggleTask(task.id)}>
                    Toggle
                </button>
                <button className="button" onClick={() => {
                    setEditingTaskId(task.id);
                    setEditedText(task.title);
                }}
                >
                    Edit
                </button>
            </div>
            </div>

        </div>
    );
}


export default TaskItem;