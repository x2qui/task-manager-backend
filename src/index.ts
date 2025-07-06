import express from 'express';
import taskRoutes from './routes/tasks';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());
app.use('/tasks', taskRoutes);
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 4000;


if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

export default app; 
