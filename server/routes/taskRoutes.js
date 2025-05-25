import express from 'express';
import auth from '../middlewares/authMiddleware.js';
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  exportTasksToCSV,
  exportTasksToPDF,
  exportTasksToExcel
} from '../controllers/taskController.js';

const router = express.Router();

router.use(auth);

router.get('/', getTasks);
router.get('/:id', getTask);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

router.get('/export/csv', exportTasksToCSV);
router.get('/export/excel', exportTasksToExcel);
router.get('/export/pdf', exportTasksToPDF);

export default router;
