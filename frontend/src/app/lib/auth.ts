export async function me(token: string | undefined) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
    headers: { cookie: `token=${token}` },
    cache: 'no-store'
  });

  if (!res.ok) return null;
  return res.json();
}
