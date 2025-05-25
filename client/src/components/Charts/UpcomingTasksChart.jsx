import { useSelector } from 'react-redux';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { useState, useMemo } from 'react';
import { Calendar } from 'lucide-react';

dayjs.extend(isoWeek);

function UpcomingTasksChart() {
  const tasks = useSelector(state => state.tasks.list || []);
  const [view, setView] = useState('daily'); // 'daily' or 'weekly'

  const groupedData = useMemo(() => {
    const grouped = {};
    tasks.forEach(task => {
      if (!task.dueDate) return;
      const date = dayjs(task.dueDate);
      if (!date.isValid()) return;
      const key = view === 'weekly'
        ? date.startOf('isoWeek').format('YYYY-[W]WW')
        : date.format('YYYY-MM-DD');
      grouped[key] = (grouped[key] || 0) + 1;
    });
    return Object.entries(grouped)
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => new Date(a.label) - new Date(b.label));
  }, [tasks, view]);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center text-blue-600">
          <Calendar className="w-6 h-6 mr-2" />
          <h2 className="text-xl font-semibold">Upcoming Tasks</h2>
        </div>
        <button
          onClick={() => setView(view === 'daily' ? 'weekly' : 'daily')}
          className="text-sm bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700 transition"
        >
          {view === 'daily' ? 'Weekly View' : 'Daily View'}
        </button>
      </div>

      {groupedData.length === 0 ? (
        <p className="text-center text-gray-500">No upcoming tasks.</p>
      ) : (
        <div className="bg-white rounded-xl p-4">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={groupedData}>
              <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
              <XAxis
                dataKey="label"
                tick={{ fill: '#4b5563' }}
                tickFormatter={val =>
                  view === 'weekly'
                    ? `Week of ${dayjs(val, 'YYYY-[W]WW').format('MMM D')}`
                    : dayjs(val).format('MMM D')
                }
              />
              <YAxis allowDecimals={false} tick={{ fill: '#4b5563' }} />
              <Tooltip
                contentStyle={{ borderRadius: '8px' }}
                labelFormatter={label =>
                  view === 'weekly'
                    ? `Week of ${dayjs(label, 'YYYY-[W]WW').format('MMMM D, YYYY')}`
                    : dayjs(label).format('MMMM D, YYYY')
                }
                formatter={value => [`${value} task(s)`, 'Tasks']}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 4, fill: '#3b82f6' }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default UpcomingTasksChart;

