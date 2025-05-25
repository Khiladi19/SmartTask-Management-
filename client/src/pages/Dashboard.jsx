import TaskList from '../components/TaskList';
import ExportButtons from '../components/ExportButttons';
import CompletedTasksChart from '../components/Charts/CompletedTasksChart';
import UpcomingTasksChart from '../components/Charts/UpcomingTasksChart';
import TaskForm from '../components/TaskForm';
import { useDispatch } from 'react-redux';
import { fetchTasks } from '../features/tasks/taskSlice';
import { useEffect } from 'react';

function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 text-gray-800 pt-20">
      {/* Header */}
      <header className="bg-white shadow-md p-5 text-center text-2xl font-bold tracking-wide text-blue-700">
        Smart Task Manager Dashboard
      </header>

      {/* Charts Section */}
      <section className="px-6 py-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">📊 Task Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow p-5">
            <CompletedTasksChart />
          </div>
          <div className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow p-5">
            <UpcomingTasksChart />
          </div>
        </div>
      </section>

      {/* Main Section */}
      <main className="px-6 pb-10 space-y-10">
        {/* Export + Form */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-700">📝 Manage Tasks</h2>
            <ExportButtons />
          </div>
          <div className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow p-6">
            <TaskForm />
          </div>
        </section>

        {/* Task List */}
        <section>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">📋 Task Overview</h2>
          <div className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow p-6">
            <TaskList />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;




