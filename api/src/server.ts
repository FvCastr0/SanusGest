import fastify from 'fastify';
import 'module-alias/register';
import routes from 'routes';

const app = fastify({ logger: true });

const start = async () => {
  await app.register(routes);

  try {
    await app.listen({ port: 3000 });
  }
  catch (e) {
    console.log(e);
    process.exit();
  }
}

start();
