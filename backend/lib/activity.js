export async function register_activity(astera, {
  user_id,
  type,
  involved,
  context
}) {
  await astera.prisma.activity.create({
    data: { user_id, type, involved, context }
  });
  
  await astera.prisma.$executeRaw`
    delete from activity
    where user_id = ${user_id}
    and id not in (
      select id from activity
      where user_id = ${user_id}
      order by created desc
      limit 100
    )
  `;
}