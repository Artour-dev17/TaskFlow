type Task = {
    id: number;
    title: string;
    completed: boolean;
};

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
        <div>
            {editingTaskId === task.id ? (
                <div>
                    <input
                        value={editedText}
                        onChange={(event) => setEditedText(
                            event.target.value
                        )}
                    />

                    <button onClick={() => saveEditedTask(task.id)}>
                        Save
                    </button>
                </div>
            ) : (
                <p>
                    {task.completed ? "✅" : "⬜"}{" "}
                    {task.title}
                </p>
            )}

            <button onClick={() => deleteTask(task.id)}>
                Delete
            </button>

            <button onClick={() => toggleTask(task.id)}>
                Toggle
            </button>
            <button onClick={() => {setEditingTaskId(task.id);
                                        setEditedText(task.title);
            }}
                >
                Edit
            </button>
        </div>
    );
}


export default TaskItem;