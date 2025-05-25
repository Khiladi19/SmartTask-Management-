import { useSelector } from 'react-redux';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LabelList, CartesianGrid, RadialBarChart, RadialBar
} from 'recharts';
import { CheckCircle2 } from 'lucide-react'; // icon

function CompletedTasksChart() {
  const tasks = useSelector((state) => state.tasks.list || []);
  const completedCount = tasks.filter((t) => t.status === 'completed').length;
  const pendingCount   = tasks.filter((t) => t.status === 'pending').length;
  const total          = tasks.length;
  const percent        = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  const barData = [
    { name: 'Completed', count: completedCount },
    { name: 'Pending',   count: pendingCount },
  ];
  const radialData = [{ name: 'Done %', value: percent }];

  return (
    <div className="bg-gradient-to-br from-green-50 to-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-shadow">
      <div className="flex items-center mb-4">
        <CheckCircle2 className="text-green-600 w-6 h-6 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">
          Task Completion
        </h2>
      </div>

      {total === 0 ? (
        <p className="text-center text-gray-500">No tasks to display.</p>
      ) : (
        <>
          <p className="text-center text-sm text-gray-600 mb-6">
            <span className="font-medium text-gray-800">{percent}%</span> done ({completedCount}/{total})
          </p>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Bar Chart */}
            <div className="flex-1 h-64 bg-white rounded-xl p-4">
              <ResponsiveContainer>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
                  <XAxis dataKey="name" tick={{ fill: '#4b5563' }} />
                  <YAxis allowDecimals={false} tick={{ fill: '#4b5563' }} />
                  <Tooltip
                    contentStyle={{ borderRadius: '8px' }}
                    itemStyle={{ color: '#1f2937' }}
                  />
                  <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]}>
                    <LabelList dataKey="count" position="top" fill="#065f46" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Radial Chart */}
            <div className="relative w-full md:w-48 h-64 flex items-center justify-center bg-white rounded-xl p-4">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  innerRadius="80%"
                  outerRadius="100%"
                  data={radialData}
                  startAngle={90}
                  endAngle={-270}
                >
                  <RadialBar 
                    dataKey="value" 
                    cornerRadius={10} 
                    fill="#10b981" 
                    background={{ fill: '#d1fae5' }} 
                  />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute text-2xl font-bold text-green-700">
                {percent}%
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CompletedTasksChart;

