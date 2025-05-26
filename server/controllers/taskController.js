import Task from '../models/Task.js';
import AuditLog from '../models/AuditLog.js';

import { Parser } from 'json2csv';
import ExcelJS from 'exceljs';
import PDFDocument from 'pdfkit';

// CREATE
export const createTask = async (req, res, next) => {
  try {
    const task = await Task.create({ ...req.body, userId: req.user.id });
    await AuditLog.create({ userId: req.user.id, action: 'create', taskId: task._id });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

// READ ALL
export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

// READ ONE
export const getTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    res.json(task);
  } catch (err) {
    next(err);
  }
};

// UPDATE
export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    await AuditLog.create({ userId: req.user.id, action: 'update', taskId: task._id });
    res.json(task);
  } catch (err) {
    next(err);
  }
};

// DELETE
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    await AuditLog.create({ userId: req.user.id, action: 'delete', taskId: task._id });
    res.json({ msg: 'Task deleted' });
  } catch (err) {
    next(err);
  }
};


// Export CSV
export const exportTasksToCSV = async (req, res) => {
  const tasks = await fetchTasks(req.user._id);
  const fields = ['name', 'description', 'category', 'dueDate', 'status'];
  const parser = new Parser({ fields });
  const csv = parser.parse(tasks);

  res.header('Content-Type', 'text/csv');
  res.attachment('tasks.csv');
  return res.send(csv);
};

//  Export Excel
export const exportTasksToExcel = async (req, res) => {
  const tasks = await fetchTasks(req.user._id);
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Tasks');

  worksheet.columns = [
    { header: 'Name', key: 'name' },
    { header: 'Description', key: 'description' },
    { header: 'Category', key: 'category' },
    { header: 'Due Date', key: 'dueDate' },
    { header: 'Status', key: 'status' },
  ];

  tasks.forEach(task => worksheet.addRow(task));

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename=tasks.xlsx');

  await workbook.xlsx.write(res);
  res.end();
};

//  Export PDF
export const exportTasksToPDF = async (req, res) => {
  const tasks = await fetchTasks(req.user._id);
  const doc = new PDFDocument();

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=tasks.pdf');

  doc.pipe(res);
  doc.fontSize(16).text('Your Tasks', { underline: true });
  doc.moveDown();

  tasks.forEach(task => {
    doc.fontSize(12).text(`• ${task.name}`);
    doc.text(`  Description: ${task.description}`);
    doc.text(`  Category: ${task.category}`);
    doc.text(`  Due Date: ${new Date(task.dueDate).toLocaleDateString()}`);
    doc.text(`  Status: ${task.status}`);
    doc.moveDown();
  });

  doc.end();
}; 