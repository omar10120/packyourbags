import type { Server as HTTPServer } from "http";
import type { Socket as NetSocket } from "net";
import type { Server as IOServer } from  "socket.io";

export interface SocketServer extends HTTPServer {
  io?: IOServer;
}

export interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

export interface NextApiResponseServerIO extends Response {
  socket: SocketWithIO;
}
