import fastify from "fastify";
import prisma_plugin from "./plugins/prisma.js";
import argon2 from "argon2";

const astera = fastify();
astera.register(prisma_plugin);

astera.get("/health", async () => {
  return { ok: true };
});

astera.get("/users", async () => {
  const users = await astera.prisma.user.findMany();
  return users;
});

astera.get("/register", async (req, reply) => {
  const { username, email, password } = request.body();

  if (!username || !email || !password) {
    return reply.status(400).send({
      error: 'username, email, and password is required to register'
    });
  }

  const existing = await astera.prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }]
    }
  });

  if (existing) {
    return reply.status(400).send({
      error: 'user with email or username already exists'
    });
  }

  const hashed = await argon2.hash(password, {
    type: argon2.argon2id
  });

  const user = await astera.prisma.create({
    data: {
      username,
      email,
      password: hashed
    }
  });

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    created_at: user.created_at
  };
});

astera.get("/user/:id", async (req, reply) => {
  const { id } = req.params;
  const user = astera.prisma.user.findUnique({
    where: { id: Number(id) }
  });

  if (!user) return reply.status(404).send({
    error: 'no user with such id exists'
  });

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    created_at: user.created_at
  }
});

astera.get("/user/by-user/:username", async (req, reply) => {
  const { username } = req.params;
  const user = astera.prisma.user.findUnique({
    where: { username }
  });

  if (!user) return reply.status(404).send({
    error: 'no user with such username exists'
  });

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    created_at: user.created_at
  }
});

const port = 3001;
astera.listen({ port }, err => {
  if (err) console.error(err);
  else console.log("astera listening on port", port);
});
