const http = require('http');
const { Server } = require('socket.io');
const app = require('./src/app');

const server = http.createServer(app);
const io = new Server(server);

// Attach Socket.io instance to Express app for route access
app.set('io', io);

io.on('connection', (socket) => {
  console.log(`⚡ WebSocket client connected: ${socket.id}`);
  socket.on('disconnect', () => {
    console.log(`🔌 WebSocket client disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 TaskEngine Enterprise running at http://localhost:${PORT}`);
});