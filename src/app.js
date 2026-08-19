const express = require('express');
const path = require('path');
const TaskModel = require('./models/task.model');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// 1. GET /api/tasks - Retrieve active tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await TaskModel.getAllActive();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. POST /api/tasks - Create task
app.post('/api/tasks', async (req, res) => {
  const { title, priority } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });

  try {
    const newTask = await TaskModel.create({ title, priority });
    const io = req.app.get('io');
    if (io) io.emit('task-sync'); // Real-time WebSocket broadcast
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. PATCH /api/tasks/:id/status - Move status
app.patch('/api/tasks/:id/status', async (req, res) => {
  const { status } = req.body;
  try {
    const result = await TaskModel.updateStatus(req.params.id, status);
    const io = req.app.get('io');
    if (io) io.emit('task-sync');
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. DELETE /api/tasks/:id - Soft delete
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const result = await TaskModel.softDelete(req.params.id);
    const io = req.app.get('io');
    if (io) io.emit('task-sync');
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;