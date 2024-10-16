import { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Header from "./Header";
import { Domain } from "../utils/constants";

import Column from "./Column";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState("ToDo");
  const [showForm, setShowForm] = useState(false);
  const [assignee, setAssignee] = useState("");
  const [users, setUsers] = useState([]);

  const handleAddTaskClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");

    try {
      const response = await fetch(`${Domain}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: newTask,
          description: taskDescription,
          status: taskStatus,
          assignee: assignee,
        }),
      });

      const data = await response.json();
      console.log("Task added", data);
      setShowForm(false); // Hide the form on success
      setTasks((prevTasks) => [...prevTasks, data]);
    } catch (error) {
      console.error("Error adding task", error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const token = sessionStorage.getItem("token");

      try {
        const response = await fetch(`${Domain}/api/auth/allUsers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setUsers(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    const fetchTasks = async () => {
      const token = sessionStorage.getItem("token");

      try {
        const response = await fetch(`${Domain}/api/tasks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setTasks(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching tasks", error);
      }
    };

    fetchUsers();
    fetchTasks();
  }, []);

  const deleteTask = async (taskId) => {
    const token = sessionStorage.getItem("token");

    try {
      await fetch(`${Domain}/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  const updateTask = async (taskId, updatedTitle, updatedDescription) => {
    const token = sessionStorage.getItem("token");

    try {
      await fetch(`${Domain}/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: updatedTitle,
          description: updatedDescription,
        }),
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId
            ? { ...task, title: updatedTitle, description: updatedDescription }
            : task
        )
      );
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  const moveTask = async (task, newStatus) => {
    const token = sessionStorage.getItem("token");

    try {
      await fetch(`${Domain}/api/tasks/${task._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...task, status: newStatus }),
      });

      setTasks((prevTasks) =>
        prevTasks.map((t) => (t._id === task._id ? { ...t, status: newStatus } : t))
      );
    } catch (error) {
      console.error("Error updating task status", error);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Header />
      <div className="p-6">
        <button onClick={handleAddTaskClick} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Task
        </button>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg">
              <h2 className="text-2xl mb-4">Add a New Task</h2>

              <form onSubmit={handleFormSubmit}>
                <input
                  type="text"
                  className="border p-2 w-full mb-4"
                  placeholder="Task Name"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  required
                />
                <textarea
                  className="border p-2 w-full mb-4"
                  placeholder="Task Description"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                />
                <select
                  value={assignee}
                  onChange={(e) => setAssignee(e.target.value)}
                  className="border p-2 w-full mb-4"
                >
                  <option value="">Select Assignee</option>
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.firstName}
                    </option>
                  ))}
                </select>
                <select
                  className="border p-2 w-full mb-4"
                  value={taskStatus}
                  onChange={(e) => setTaskStatus(e.target.value)}
                >
                  <option value="ToDo">To Do</option>
                  <option value="InProgress">In Progress</option>
                  <option value="Done">Done</option>
                </select>

                <div className="flex justify-end">
                  <button type="button" onClick={handleCloseForm} className="mr-4 px-4 py-2 text-gray-600">
                    Cancel
                  </button>
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Add Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="mb-4">
          <input className="border p-2" type="text" placeholder="Search..." />
          <select className="ml-2 border p-2">
            <option>Recent</option>
          </select>
        </div>

        <div className="flex gap-4 justify-between mt-6 rounded-lg shadow-md m-4">
          <Column
            className="m-4 p-3"
            status="ToDo"
            tasks={tasks}
            moveTask={moveTask}
            deleteTask={deleteTask}
            updateTask={updateTask}
            assignee={assignee}
          />
          <Column
            status="InProgress"
            tasks={tasks}
            moveTask={moveTask}
            deleteTask={deleteTask}
            updateTask={updateTask}
            assignee={assignee}
          />
          <Column
            status="Done"
            tasks={tasks}
            moveTask={moveTask}
            deleteTask={deleteTask}
            updateTask={updateTask}
            assignee={assignee}
          />
        </div>

        <div className="bg-blue-200 p-4 rounded-lg shadow-md flex flex-wrap">
          {Array.isArray(tasks) && tasks.length > 0 ? (
            tasks.map((task) => (
              <div key={task._id} className="mb-4 bg-white p-4 shadow-md rounded-md mx-3">
                <h3 className="text-xl font-bold">{task.title}</h3>
                <p>{task.description}</p>
                <p>Status: {task.status}</p>
                <p>Created at: {new Date(task.createdAt).toLocaleString()}</p>
                <div className="flex mt-4">
                  <button
                    className="bg-red-500 text-white py-1 px-2"
                    onClick={() => deleteTask(task._id)}
                  >
                    Delete
                  </button>
                  <button className="bg-blue-500 text-white py-1 px-2 ml-2">Edit</button>
                  <button className="bg-gray-500 text-white py-1 px-2 ml-2">View Details</button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center w-full">No tasks found.</div>
          )}
        </div>
      </div>
    </DndProvider>
  );
}
