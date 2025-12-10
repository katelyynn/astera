import fastify from "fastify";
import prisma_plugin from "./plugins/prisma.js";

const server = fastify();
server.register(prisma_plugin);

server.get("/health", async () => {
  return { ok: true };
});

server.get("/users", async () => {
  const users = await server.prisma.user.findMany();
  return users;
});

const port = 3001;
server.listen({ port }, err => {
  if (err) console.error(err);
  else console.log("server listening on port", port);
});
