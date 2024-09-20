const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    status: { type: String, enum: ['ToDo', 'InProgress', 'Done'], required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
    
},
{
    timestamps: true  // This will add createdAt and updatedAt fields automatically
  }

);

module.exports = mongoose.model('Task', TaskSchema);
