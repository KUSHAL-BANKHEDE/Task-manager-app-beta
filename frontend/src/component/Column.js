
import { useDrop} from "react-dnd";

import TaskCard from "./TaskCard";

export default function Column({ status, tasks, moveTask, deleteTask, updateTask,}) {
    const [,drop] = useDrop({
      accept: "TASK",
      drop: (item) => moveTask(item.task, status),
    });
  
    return (
      <div ref={drop} className="w-1/3 p-2 bg-gray-200 rounded-md shadow-lg">
        <h2 className="text-xl bg-blue-400 text-white px-3 font-bold mb-4">{status}</h2>
        {tasks
          .filter((task) => task.status === status)
          .map((task) => (
            <TaskCard key={task._id} task={task} moveTask={moveTask} deleteTask={deleteTask} updateTask={updateTask} />
          ))}
      </div>
    );
  }