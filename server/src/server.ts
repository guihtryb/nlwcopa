import Fastify from  'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import fs from 'fs';

import { pollRoutes } from './routes/poll';
import { userRoutes } from './routes/user';
import { guessRoutes } from './routes/guess';
import { authRoutes } from './routes/auth';
import { gameRoutes } from './routes/game';

async function start() {
  const fastify = Fastify({
    logger: true,
  });

  fastify.register(cors, { origin: true });
  fastify.register(jwt, { secret: fs.readFileSync('./jwt.secret.key').toString() });

  await fastify.register(authRoutes);
  await fastify.register(gameRoutes);
  await fastify.register(pollRoutes);
  await fastify.register(userRoutes);
  await fastify.register(guessRoutes);

  await fastify.listen({ port: 3333,  host: '0.0.0.0'});
}

start();