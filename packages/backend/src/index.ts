import Fastify from 'fastify';
import cors from '@fastify/cors';
import websocket from '@fastify/websocket';
import { z } from 'zod';

const fastify = Fastify({
  logger: true
});

await fastify.register(cors, {
  origin: true
});

await fastify.register(websocket);

// Connected clients
const clients = new Map<string, {
  connection: WebSocket;
  userId: string;
  gameId?: string;
}>();

// Active games
const games = new Map<string, {
  playerIds: [string, string];
  challenge: any;
  startTime: number;
  solutions: Map<string, string>;
}>();

// WebSocket connection handler
fastify.get('/ws', { websocket: true }, (connection, req) => {
  const clientId = req.headers['sec-websocket-key'];
  
  clients.set(clientId, {
    connection: connection.socket,
    userId: 'temp-' + Math.random().toString(36).substr(2, 9)
  });

  connection.socket.on('message', async (message: Buffer) => {
    try {
      const data = JSON.parse(message.toString());
      
      switch (data.type) {
        case 'join_game':
          // Handle game join
          break;
        
        case 'submit_solution':
          // Handle solution submission
          break;
        
        case 'leave_game':
          // Handle game leave
          break;
      }
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });

  connection.socket.on('close', () => {
    const client = clients.get(clientId);
    if (client?.gameId) {
      // Handle player disconnect from game
    }
    clients.delete(clientId);
  });
});

// REST endpoints
fastify.get('/api/health', async () => {
  return { status: 'ok' };
});

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
try {
  await fastify.listen({ port, host: '0.0.0.0' });
  console.log(`Server listening on port ${port}`);
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}