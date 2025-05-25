// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addTask, updateTask, clearEditingTask } from '../features/tasks/taskSlice';

// function TaskForm() {
//   const dispatch = useDispatch();
//   const editingTask = useSelector((state) => state.tasks.editingTask);

//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     dueDate: '',
//     status: 'pending',
//   });

//   useEffect(() => {
//     if (editingTask) {
//       setFormData({
//         title: editingTask.title || '',
//         description: editingTask.description || '',
//         dueDate: editingTask.dueDate?.substring(0, 10) || '',
//         status: editingTask.status || 'pending',
//       });
//     } else {
//       setFormData({
//         title: '',
//         description: '',
//         dueDate: '',
//         status: 'pending',
//       });
//     }
//   }, [editingTask]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (editingTask) {
//       dispatch(updateTask({ id: editingTask._id, updates: formData }));
//     } else {
//       dispatch(addTask(formData));
//     }

//     setFormData({
//       title: '',
//       description: '',
//       dueDate: '',
//       status: 'pending',
//     });

//     dispatch(clearEditingTask());
//   };

//   return (
//     <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
//       <h2 className="text-lg font-semibold mb-4">{editingTask ? 'Edit Task' : 'Add New Task'}</h2>
//       <input
//         type="text"
//         name="title"
//         value={formData.title}
//         onChange={handleChange}
//         placeholder="Title"
//         required
//         className="border p-2 mb-2 w-full"
//       />
//       <textarea
//         name="description"
//         value={formData.description}
//         onChange={handleChange}
//         placeholder="Description"
//         required
//         className="border p-2 mb-2 w-full"
//       />
//       <input
//         type="date"
//         name="dueDate"
//         value={formData.dueDate}
//         onChange={handleChange}
//         required
//         className="border p-2 mb-2 w-full"
//       />
//       <select
//         name="status"
//         value={formData.status}
//         onChange={handleChange}
//         className="border p-2 mb-2 w-full"
//       >
//         <option value="pending">Pending</option>
//         <option value="completed">Completed</option>
//       </select>

//       <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
//         {editingTask ? 'Update Task' : 'Add Task'}
//       </button>
//     </form>
//   );
// }

// export default TaskForm;


import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addTask, updateTask, clearEditingTask } from '../features/tasks/taskSlice';
import { PlusCircle, Edit3 } from 'lucide-react';

function TaskForm() {
  const dispatch = useDispatch();
  const editingTask = useSelector((state) => state.tasks.editingTask);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'pending',
  });

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || '',
        description: editingTask.description || '',
        dueDate: editingTask.dueDate?.substring(0, 10) || '',
        status: editingTask.status || 'pending',
      });
    } else {
      setFormData({ title: '', description: '', dueDate: '', status: 'pending' });
    }
  }, [editingTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    if (editingTask) {
      dispatch(updateTask({ id: editingTask._id, updates: formData }));
      toast.success('Task updated successfully!');
    } else {
      dispatch(addTask(formData));
      toast.success('Task added successfully!');
    }

    setFormData({ title: '', description: '', dueDate: '', status: 'pending' });
    dispatch(clearEditingTask());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="flex items-center mb-6">
        {editingTask ? (
          <Edit3 className="w-6 h-6 text-blue-600 mr-2" />
        ) : (
          <PlusCircle className="w-6 h-6 text-green-600 mr-2" />
        )}
        <h2 className="text-2xl font-semibold text-gray-800">
          {editingTask ? 'Edit Task' : 'Add New Task'}
        </h2>
      </div>

      <div className="space-y-5">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-600">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title"
            required
            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-600">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter task description"
            rows="4"
            required
            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-600">
              Due Date
            </label>
            <input
              id="dueDate"
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-600">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          {editingTask ? 'Update Task' : 'Add Task'}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;

