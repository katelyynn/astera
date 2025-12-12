export const auth = async (req, reply) => {
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
