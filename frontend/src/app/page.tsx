import { cookies } from "next/headers";
import { AsteraCard } from "./_components/card/card";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookie = await cookies();
  const token = cookie.get('token')?.value || '';

  if (!token) {
    redirect('/login');
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
    headers: { cookie: `token=${token}` },
    cache: 'no-store'
  });

  if (!res.ok) {
    redirect('/login');
  }

  const me = await res.json();

  return (
    <AsteraCard>
      <h1>home</h1>
      <p>welcome back, <strong>{me.username}</strong> ({me.email})</p>
      <p>user id: {me.id}</p>
    </AsteraCard>
  );
}
