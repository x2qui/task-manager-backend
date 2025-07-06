import express from 'express';
import { upload } from '../middleware/upload';
import { downloadAttachment } from '../controllers/tasksController';
import {getTasks,getTaskById,createTask,updateTaskStatus,deleteTask
} from '../controllers/tasksController';

const router = express.Router();

router.get('/', getTasks);
router.get('/:id', getTaskById);
router.post('/', upload.single('file'), createTask);
router.get('/:id/download', downloadAttachment);
router.patch('/:id/status', updateTaskStatus);
router.delete('/:id', deleteTask);

export default router;
