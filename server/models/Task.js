import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  description: String,
  category: String,
  dueDate: Date,
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' }
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

export default Task;
