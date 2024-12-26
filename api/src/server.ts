import jwt from '@fastify/jwt';
import routes from '@routes';
import fastify from 'fastify';
import fp from 'fastify-plugin';
import 'module-alias/register';

const app = fastify({ logger: true });
const secret = String(process.env.SECRET)

const start = async () => {
  await app.register(routes);
  await app.register(fp(async (fastify) => {
    fastify.register(jwt, {
      secret
    });
  }));

  try {
    await app.listen({ port: 3000 });
  }
  catch (e) {
    console.log(e);
    process.exit();
  }
}

start();
