import request from 'supertest';
import app from '../src/index';
import { prisma } from '../prisma/client';


describe('Task API Integration Tests', () => {
  let taskId = '';

    // Clear tasks before running tests
  beforeAll(async () => {
    await prisma.task.deleteMany();
  });

  it('should return 400 if required fields are missing', async () => {
    const res = await request(app).post('/tasks').send({
      title: 'Missing required fields',
    });
    expect(res.statusCode).toBe(400);
  });

  it('should create a task', async () => {
    const res = await request(app).post('/tasks').send({
      title: 'Document Review',
      caseNumber: 'CASE-1234',
      description: 'Review legal case files',
      status: 'open',
      dueDate: '2025-06-30T12:00:00Z',
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    taskId = res.body.id;
  });

  it('should retrieve all tasks', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should retrieve a task by ID', async () => {
    const res = await request(app).get(`/tasks/${taskId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(taskId);
  });

  it('should update task status', async () => {
    const res = await request(app)
      .patch(`/tasks/${taskId}/status`)
      .send({ status: 'in-progress' });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('in-progress');
  });

  it('should delete task', async () => {
  const res = await request(app).delete(`/tasks/${taskId}`);
  if (res.statusCode === 404) {
    console.warn('Task not found. Check creation test or DB reset timing.');
  }
  expect(res.statusCode).toBe(204);
});

});
