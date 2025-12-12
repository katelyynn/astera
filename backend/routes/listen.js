import { auth } from "../lib/auth.js";

export default async function listen_route(astera) {
  astera.post('/listen', { preHandler: auth }, async (req, reply) => {
    const {
      track_id,
      album_id,
      listened,
      raw_track,
      raw_artist,
      raw_album,
      raw_album_artist
    } = req.body;

    const user = req.user;

    if (!track_id && !album_id && !raw_track && !raw_artist && !raw_album)
      return reply.status(400).send({ error: 'missing both ids and fallback' });

    if (!listened)
      return reply.status(400).send({ error: 'missing listened date' });

    try {
      const listen = await astera.prisma.listen.create({
        data: {
          user_id: user.userId,
          track_id,
          album_id,
          listened: new Date(listened),
          raw_track,
          raw_artist,
          raw_album,
          raw_album_artist
        }
      });

      return reply.send({ ok: true, listen });
    } catch(e) {
      console.log('listen failed', e);
      return reply.status(500).send({ error: 'failed to submit listen' });
    }
  });
}
