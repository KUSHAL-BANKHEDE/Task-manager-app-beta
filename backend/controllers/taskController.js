const Task = require('../models/taskModel');

// Create a new task
exports.createTask = async (req, res) => {
    try {
        const task = new Task({
            ...req.body,
            createdBy: req.user  // Attach the user ID to the task
        });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: 'Error creating task', error });
    }
};

// Get all tasks for the authenticated user
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ createdBy: req.user });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching tasks', error });
    }
};

// Update a task
exports.updateTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findOneAndUpdate(
            { _id: id, createdBy: req.user }, 
            req.body, 
            { new: true }
        );
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ message: 'Error updating task', error });
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findOneAndDelete({ _id: id, createdBy: req.user });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting task', error });
    }
};
