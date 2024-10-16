
import { useState} from "react";
import { useDrag} from "react-dnd";

export default function TaskCard({task , moveTask , deleteTask, updateTask}){

  
  
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);
    const [editedDescription, setEditedDescription] = useState(task.description);
  
    const [{ isDragging }, drag] = useDrag(() => ({
      type: "TASK",
      item: { task },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));
  
    const opacity = isDragging ? 0.5 : 1;
  
    const handleEditClick = () => {
      setIsEditing(true);
    };
  
    const handleSaveClick = () => {
      updateTask(task._id, editedTitle, editedDescription);
      setIsEditing(false); // Exit edit mode after saving
    };
  
    const handleCancelClick = () => {
      setIsEditing(false); // Cancel edit mode
      setEditedTitle(task.title); // Reset title and description
      setEditedDescription(task.description);
    };
  
    return (
      <div
        ref={drag}
        className="bg-blue-200 p-4 shadow-md rounded-md mb-2"
        style={{ opacity }}
      >
        {isEditing ? (
          // Render the edit form if in editing mode
          <>
            <input
              type="text"
              className="border p-2 w-full mb-2"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <textarea
              className="border p-2 w-full mb-2"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
            <div className="flex mt-4">
              <button className="bg-green-500 text-white py-1 px-2" onClick={handleSaveClick}>
                Save
              </button>
              <button className="bg-gray-500 text-white py-1 px-2 ml-2" onClick={handleCancelClick}>
                Cancel
              </button>
            </div>
          </>
        ) : (
          // Render task details if not in editing mode
          <>
            <h3 className="text-xl font-bold">{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Assignee: {task.assignee.firstName}</p>

            <div className="flex mt-4">
              <button className="bg-red-500 text-white py-1 px-2" onClick={() => deleteTask(task._id)}>
                Delete
              </button>
              <button className="bg-blue-500 text-white py-1 px-2 ml-2" onClick={handleEditClick}>
                Edit
              </button>
              <button className="bg-gray-500 text-white py-1 px-2 ml-2">View Details</button>
            </div>
          </>
        )}
      </div>
    );
  
  }

  