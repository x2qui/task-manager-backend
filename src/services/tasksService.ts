import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllTasks = () => {
  return prisma.task.findMany();
};

export const getTaskById = (id: string) => {
  return prisma.task.findUnique({ where: { id } });
};

export const createTask = ({
  title,
  description,
  caseNumber,
  status,
  dueDate,
  attachment,
}: {
  title: string;
  description?: string;
  caseNumber: string;
  status: string;
  dueDate: string;
  attachment?: string;
}) => {
  return prisma.task.create({
  data: {
    title,
    description,
    caseNumber, 
    status,
    dueDate: new Date(dueDate),
    attachment,
  },
});
};


export const updateTaskStatus = (id: string, status: string) => {
  return prisma.task.update({
    where: { id },
    data: { status },
  });
};

export const deleteTask = (id: string) => {
  return prisma.task.delete({ where: { id } });
};
