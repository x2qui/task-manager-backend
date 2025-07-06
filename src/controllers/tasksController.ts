import { Request, Response } from 'express';
import path from 'path';
import * as taskService from '../services/tasksService';

// GET /tasks
export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await taskService.getAllTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

// GET /tasks/:id
export const getTaskById = async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    if (!task) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch task' });
  }
};

// POST /tasks
export const createTask = async (req: Request, res: Response): Promise<void> => {
  const { title, description, caseNumber, status, dueDate } = req.body;
  const file = req.file;

  if (!title || !status || !dueDate || !caseNumber) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  try {
    const newTask = await taskService.createTask({
      title,
      description,
      caseNumber,
      status,
      dueDate,
      attachment: file?.filename,
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

// PATCH /tasks/:id/status
export const updateTaskStatus = async (req: Request, res: Response): Promise<void> => {
  const { status } = req.body;

  if (!status) {
    res.status(400).json({ error: 'Status is required' });
    return;
  }

  try {
    const updated = await taskService.updateTaskStatus(req.params.id, status);
    if (!updated) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task status' });
  }
};

// GET /tasks/:id/download
export const downloadAttachment = async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    if (!task || !task.attachment) {
      res.status(404).json({ error: 'No file found for this task' });
      return;
    }

    const filePath = path.join(__dirname, '../../uploads', task.attachment);
    res.download(filePath);
  } catch (error) {
    res.status(500).json({ error: 'Download failed' });
  }
};

// DELETE /tasks/:id
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await taskService.deleteTask(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};
