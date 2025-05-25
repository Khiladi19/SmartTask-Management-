import { useSelector } from 'react-redux';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import dayjs from 'dayjs';
import { Download, FileText } from 'lucide-react';
import { toast } from 'react-toastify';

function ExportButtons() {
  const tasks = useSelector((state) => state.tasks.list || []);
  const disabled = tasks.length === 0;
  const timestamp = dayjs().format('YYYY-MM-DD_HH-mm');

  const exportCSV = () => {
    const headers = ['Title', 'Description', 'Due Date', 'Status'];
    const rows = tasks.map(t => [
      t.title,
      t.description,
      dayjs(t.dueDate).format('YYYY-MM-DD'),
      t.status,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row =>
        row.map(field => `"${(field ?? '').toString().replace(/"/g, '""')}"`).join(',')
      )
    ].join('\r\n');

    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' }); // Add UTF-8 BOM
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `tasks_${timestamp}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('CSV exported!');
  };

  const exportPDF = () => {
    const doc = new jsPDF({ unit: 'pt', format: 'letter' });
    const tableBody = tasks.map(t => [
      t.title,
      t.description,
      dayjs(t.dueDate).format('YYYY-MM-DD'),
      t.status,
    ]);

    doc.setFontSize(12);
    doc.text('Task List', 40, 50);
    doc.autoTable({
      startY: 70,
      head: [['Title', 'Description', 'Due Date', 'Status']],
      body: tableBody,
      styles: { fontSize: 10, cellPadding: 6 },
      headStyles: { fillColor: [59, 130, 246] },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      margin: { left: 40, right: 40 },
    });

    doc.save(`tasks_${timestamp}.pdf`);
    toast.success('PDF exported!');
  };

  return (
    <div className="flex justify-end w-full">
      <button
        onClick={exportCSV}
        disabled={disabled}
        className={`
          flex items-center gap-1 px-4 py-2 rounded 
          ${disabled
            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
            : 'bg-green-500 text-white hover:bg-green-600'}
          transition
        `}
      >
        <Download size={16} /> CSV
      </button>

      <button
        onClick={exportPDF}
        disabled={disabled}
        className={`
          flex items-center gap-1 px-4 py-2 ml-3 rounded 
          ${disabled
            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
            : 'bg-red-500 text-white hover:bg-red-600'}
          transition
        `}
      >
        <FileText size={16} /> PDF
      </button>
    </div>
  );
}

export default ExportButtons;






