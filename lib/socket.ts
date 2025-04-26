import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const connectSocket = (): Socket => {
  if (!socket) {
    socket = io('', {
      path: '/api/socket',
      autoConnect: false, // connect manually
      transports: ['websocket'], // force WebSocket
    });
  }
  return socket;
};

export const getSocket = () => {
  if (!socket) {
    throw new Error('Socket not initialized!');
  }
  return socket;
};
