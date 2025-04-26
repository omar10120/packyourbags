import { Server as ServerIO } from 'socket.io';
import { Server as HttpServer } from 'http';

let io: ServerIO | null = null;

export function initSocket(server: HttpServer) {
  if (!io) {
    io = new ServerIO(server, {
      path: '/api/socket/io',
      addTrailingSlash: false,
      cors: {
        origin: "*", // change this in production!
        methods: ["GET", "POST"]
      }
    });
    console.log('✅ Socket.io initialized');
  }
  return io;
}

export function getIO() {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
}
