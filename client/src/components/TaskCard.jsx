import { useDispatch } from 'react-redux';
import { deleteTask, setEditingTask, updateTask } from '../features/tasks/taskSlice';
import { Pencil, Trash2, Calendar, CheckCircle2, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';

function TaskCard({ task }) {
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(setEditingTask(task));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(task._id));
    }
  };

  const toggleComplete = () => {
    dispatch(
      updateTask({
        ...task,
        status: task.status === 'completed' ? 'pending' : 'completed',
      })
    );
  };

  // border & badge colors based on status
  const accent = task.status === 'completed' ? 'green' : 'yellow';
  const borderClass = `border-l-4 border-${accent}-500`;
  const badgeBg    = `bg-${accent}-100 text-${accent}-700`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`flex flex-col bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow ${borderClass}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-gray-50">
        <div className="flex items-center gap-2">
          <button onClick={toggleComplete} className="focus:outline-none">
            {task.status === 'completed' ? (
              <CheckCircle2 className="w-6 h-6 text-green-500" />
            ) : (
              <Clock className="w-6 h-6 text-yellow-500" />
            )}
          </button>
          <h3
            className={`text-lg font-semibold ${
              task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-800'
            }`}
          >
            {task.title}
          </h3>
        </div>
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full border ${badgeBg} border-${accent}-500`}
        >
          {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
        </span>
      </div>

      {/* Body */}
      <div className="px-5 py-4 space-y-3">
        {task.description && (
          <p className="text-gray-700 leading-relaxed">{task.description}</p>
        )}
        <div className="flex items-center text-sm text-gray-600 gap-2">
          <Calendar className="w-4 h-4" />
          <span>Due {dayjs(task.dueDate).format('MMM D, YYYY')}</span>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="px-5 py-3 bg-gray-50 flex justify-end gap-3">
        <button
          onClick={handleEdit}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition"
        >
          <Pencil className="w-4 h-4" /> Edit
        </button>
        <button
          onClick={handleDelete}
          className="flex items-center gap-1 text-red-600 hover:text-red-800 transition"
        >
          <Trash2 className="w-4 h-4" /> Delete
        </button>
      </div>
    </motion.div>
  );
}

export default TaskCard;

