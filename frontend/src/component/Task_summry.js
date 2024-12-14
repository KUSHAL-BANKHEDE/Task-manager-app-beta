import React, { useState, useEffect } from "react";
import { Domain } from "../utils/constants";
import Header from "./Header";

const Summary = () => {
    const [tasks, setTasks] = useState([]);

    // Fetch tasks from backend
    useEffect(() => {
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

          fetchTasks();
    }, []);

    // Summary calculations
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.status === "Done").length;
    const pendingTasks = totalTasks - completedTasks;

    const averageTimePerTask = 3.5; // Hardcoded from UI
    const totalTimeLapsed = 56; // Mock value from UI
    const totalTimeToFinish = 24; // Mock value from UI

    return (
        <div>
            <Header/>
        <div className="container mx-auto p-8">
            
            {/* Dashboard Header */}
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

            {/* Summary Section */}
            <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="bg-gray-100 p-4 rounded">
                    <h2 className="text-2xl font-bold text-blue-600">{totalTasks}</h2>
                    <p>Total tasks</p>
                </div>
                <div className="bg-gray-100 p-4 rounded">
                    <h2 className="text-2xl font-bold text-blue-600">
                        {Math.round((completedTasks / totalTasks) * 100)}%
                    </h2>
                    <p>Tasks completed</p>
                </div>
                <div className="bg-gray-100 p-4 rounded">
                    <h2 className="text-2xl font-bold text-blue-600">
                        {Math.round((pendingTasks / totalTasks) * 100)}%
                    </h2>
                    <p>Tasks pending</p>
                </div>
                <div className="bg-gray-100 p-4 rounded">
                    <h2 className="text-2xl font-bold text-blue-600">{averageTimePerTask} hrs</h2>
                    <p>Average time per completed task</p>
                </div>
            </div>

            {/* Pending Task Summary */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Pending task summary</h2>
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-100 p-4 rounded">
                        <h2 className="text-2xl font-bold text-purple-600">{pendingTasks}</h2>
                        <p>Pending tasks</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded">
                        <h2 className="text-2xl font-bold text-purple-600">{totalTimeLapsed} hrs</h2>
                        <p>Total time lapsed</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded">
                        <h2 className="text-2xl font-bold text-purple-600">{totalTimeToFinish} hrs</h2>
                        <p>Total time to finish</p>
                    </div>
                </div>
            </div>

            {/* Task Priority Table */}
            <div>
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 px-4 py-2">Task Priority</th>
                            <th className="border border-gray-300 px-4 py-2">Pending Tasks</th>
                            <th className="border border-gray-300 px-4 py-2">Time Lapsed (hrs)</th>
                            <th className="border border-gray-300 px-4 py-2">Time to Finish (hrs)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Example Hardcoded Data */}
                        <tr>
                            <td className="border border-gray-300 px-4 py-2 text-center">1</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">3</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">12</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">8</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2 text-center">2</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">5</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">6</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">3</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2 text-center">3</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">1</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">8</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">7</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2 text-center">4</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">0</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">0</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">0</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2 text-center">5</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">6</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">30</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">6</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    );
};

export default Summary;
