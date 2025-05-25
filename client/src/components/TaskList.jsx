import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../features/tasks/taskSlice';
import TaskCard from './TaskCard';

function TaskList() {
  const dispatch = useDispatch();
  const { list: tasks, loading, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleRetry = () => {
    dispatch(fetchTasks());
  };

  return (
    <div className="p-4" data-testid="task-list">
      <h2 className="text-xl font-semibold mb-4">Task List</h2>

      {loading && <p className="text-gray-500 animate-pulse">Loading tasks...</p>}

      {!loading && error && (
        <div className="text-red-600" role="alert">
          <p>{error || 'Something went wrong while fetching tasks.'}</p>
          <button
            onClick={handleRetry}
            className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && tasks.length === 0 && (
        <div className="text-gray-500 italic">
          <p>No tasks available.</p>
        </div>
      )}

      {!loading && !error && tasks.length > 0 && (
        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;

