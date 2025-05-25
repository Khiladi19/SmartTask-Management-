import express from 'express';
import auth from '../middlewares/authMiddleware.js';
import isAdmin from '../middlewares/roleMiddleware.js';
import { createUser, deactivateUser } from '../controllers/adminController.js';

const router = express.Router();

router.use(auth, isAdmin);

router.post('/create-user', createUser);
router.put('/deactivate-user/:id', deactivateUser);

export default router;
