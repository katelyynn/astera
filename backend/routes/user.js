import { auth } from "../lib/auth.js";

export default async function user_route(astera) {
  astera.get('/users', async () => {
    const users = await astera.prisma.user.findMany();
    return users;
  });

  astera.get('/me', { preHandler: auth }, async (req, reply) => {
    const user = await astera.prisma.user.findUnique({ where: { id: req.user.userId } });
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      joined: user.joined
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
      joined: user.joined,
      about: user.about
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
      joined: user.joined,
      about: user.about
    }
  });

  astera.get('/user/:id/activity', async (req, reply) => {
    const { id } = req.params;

    const items = await astera.prisma.activity.findMany({
      where: { user_id: id },
      orderBy: { created: 'desc' },
      take: 30
    });

    return reply.send(items);
  });
}
