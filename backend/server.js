const fastify = require('fastify')();

fastify.get('/', (req, reply) => {
  reply.send({ ok: true });
});

fastify.listen({ port: 3001 });
