import { NextApiRequest, NextApiResponse } from 'next';

import { initSocket, getIO } from '@/lib/socket-server';




export async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (!(res.socket as any).server.io) {
    console.log('Initializing socket.io server...');
    initSocket((res.socket as any).server);
    (res.socket as any).server.io = getIO();
  }
  res.end();
}
