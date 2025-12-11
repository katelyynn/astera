import fastify from 'fastify';
import prisma_plugin from './plugins/prisma.js';
import cors from '@fastify/cors';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import cookie from '@fastify/cookie';

const astera = fastify();

await astera.register(cors, {
  origin: 'http://localhost:3000',
  credentials: true
});

astera.register(cookie, {
  secret: process.env.COOKIE_SECRET || 'astera',
  hook: 'onRequest'
});

astera.register(prisma_plugin);

astera.setErrorHandler((error, req, reply) => {
  console.error(error);

  reply.status(error.statusCode || 500).send({
    statusCode: error.statusCode || 500,
    error: error.name || 'interal server error',
    message: error.message || 'something went wrong.. :c'
  });
});

astera.get('/health', async () => {
  return { ok: true };
});

astera.get('/users', async () => {
  const users = await astera.prisma.user.findMany();
  return users;
});

astera.post('/register', async (req, reply) => {
  const { username, email, password } = req.body;

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

  const user = await astera.prisma.user.create({
    data: {
      username,
      email,
      password: hashed
    }
  });

  return {
    id: user.id
  };
});

astera.post('/login', async (req, reply) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return reply.status(400).send({
      error: 'email and password is required to login'
    });
  }

  const user = await astera.prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    return reply.status(401).send({
      error: 'invalid credentials'
    });
  }

  const valid = await argon2.verify(user.password, password);
  if (!valid) {
    return reply.status(401).send({
      error: 'invalid credentials'
    });
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  reply
    .setCookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    })
    .send({
      ok: true
    });
});

const auth = async (req, reply) => {
  const token = req.cookies?.token;
  if (!token) {
    return reply.status(401).send({
      error: 'missing token'
    });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
  } catch {
    return reply.status(401).send({
      error: 'missing token'
    });
  }
}

astera.get('/me', { preHandler: auth }, async (req, reply) => {
  const user = await astera.prisma.user.findUnique({ where: { id: req.user.userId } });
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    created_at: user.created_at
  };
});

astera.get('/user/:id', async (req, reply) => {
  const { id } = req.params;
  const user = await astera.prisma.user.findFirst({
    where: { id }
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

astera.get('/user/by-user/:username', async (req, reply) => {
  const { username } = req.params;
  const user = await astera.prisma.user.findFirst({
    where: { username }
  });

  if (!user) {
    return reply.status(404).send({
      error: 'no user with such username exists'
    });
  }

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
  else console.log('astera listening on port', port);
});
