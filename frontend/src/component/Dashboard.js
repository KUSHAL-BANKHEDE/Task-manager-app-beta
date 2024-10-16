import { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Header from "./Header"
import axios from "axios";
import { Domain } from "../utils/constants";

import Column from "./Column"


export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask ,setNewTask] = useState("");
  const [taskDescription , setTaskDescription] = useState("");
  const [taskStatus , setTaskStatus] = useState("ToDo");
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
    // Call your API to add the task
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.post(`${Domain}/api/tasks`, {
          title: newTask,            // Task name (title)
          description: taskDescription,  // Task description
          status: taskStatus,
          assignee: assignee
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("Task added", response.data);
      setShowForm(false); // Hide the form on success
      setTasks((prevTasks) => [...prevTasks, response.data]);
    } catch (error) {
      console.error("Error adding task", error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get(`${Domain}/api/auth/allUsers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data); // Store the fetched users
        console.log(response);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchUsers();
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      // Retrieve the JWT token from sessionStorage
      
      const token = sessionStorage.getItem("token");
      console.log(sessionStorage.getItem("token"));
      
      // Make the request with Authorization header
      const res = await axios.get(`${Domain}/api/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,  // Add token to Authorization header
          
        },

      
      });
  
      // Set the tasks from response
      setTasks(res.data);
      console.log(res);
    } catch (err) {
      console.error("Error fetching tasks", err);
    }
  };
  
  const deleteTask = async (taskId) => {
    try {
      const token = sessionStorage.getItem("token");
      await axios.delete(`${Domain}/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Filter out the deleted task from the UI
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };



  const updateTask = async (taskId, updatedTitle, updatedDescription) => {
    try {
      const token = sessionStorage.getItem("token");
      const updatedTask = { title: updatedTitle, description: updatedDescription };

      await axios.put(`${Domain}/api/tasks/${taskId}`, updatedTask, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update the task in the UI
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, title: updatedTitle, description: updatedDescription } : task
        )
      );
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  const moveTask = async (task, newStatus) => {
    try {
      const token = sessionStorage.getItem("token");
      const updatedTask = { ...task, status: newStatus };
      await axios.put(`${Domain}/api/tasks/${task._id}`, updatedTask, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t._id === task._id ? updatedTask : t))
      );
    } catch (error) {
      console.error("Error updating task status", error);
    }
  };

  return (
    <DndProvider  backend={HTML5Backend}  >
      <Header/>
    <div className="p-6">
      <button onClick={handleAddTaskClick} className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Task
      </button>



        {/* Conditional rendering of the form */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-2xl mb-4">Add a New Task</h2>

            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                className="border p-2 w-full mb-4"
                placeholder="Task Name"
                value={newTask}  // Bind to newTaskTitle state
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
                  className="border p-2 w-full mb-4 "
                >
                  <option value="">Select Assignee</option>
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.firstName}
                    </option>
                  ))}
                </select>   
                
              {/* Option to choose task status */}
              
              <select
                className="border p-2 w-full mb-4"
                value={taskStatus}  // Bind to newTaskStatus state
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



{/* Search & Filter Section */}
     <div className="mb-4">
        <input className="border p-2" type="text" placeholder="Search..." />
        <select className="ml-2 border p-2">
          <option>Recent</option>
        </select>
      </div>


      <div className="flex gap-4 justify-between mt-6 rounded-lg shadow-md m-4 ">
          <Column className = "m-4 p-3" status="ToDo" tasks={tasks} moveTask={moveTask} deleteTask={deleteTask} updateTask={updateTask} assignee = {assignee} />
          <Column status="InProgress" tasks={tasks} moveTask={moveTask} deleteTask={deleteTask} updateTask={updateTask}  assignee = {assignee} />
          <Column status="Done" tasks={tasks} moveTask={moveTask} deleteTask={deleteTask} updateTask={updateTask} assignee = {assignee} />
      </div>


       {/* Task List */}
       <div className="bg-blue-200 p-4 rounded-lg shadow-md flex flex-wrap ">
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
                >Delete</button>
                <button className="bg-blue-500 text-white py-1 px-2 ml-2">Edit</button>
                <button className="bg-gray-500 text-white py-1 px-2 ml-2">View Details</button>
              </div>
            </div>
          ))
          ) : (
            <p>No tasks available</p>
            )}
    </div>
    </div>
</DndProvider>
  );
}
