import { AsteraAlert } from "@/app/_components/alert/alert";
import { AsteraAvatar } from "@/app/_components/avatar/avatar";
import { AsteraCard, AsteraContent, AsteraContentLeft, AsteraContentRight, AsteraContentWash } from "@/app/_components/card/card";

interface User {
  id: string,
  username: string,
  email: string,
  created_at: string
}

export default async function Profile({ params }: { params: { username: string } }) {
  const { username } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/by-user/${username}`, {
    cache: 'no-store'
  });

  if (!res.ok) {
    return <AsteraCard><AsteraAlert type="error" label="user not found" /></AsteraCard>
  }

  const user: User = await res.json();

  return (
    <>
      <AsteraContentWash>
        <h1>{user.username}</h1>
      </AsteraContentWash>
      <AsteraContent>
        <AsteraContentLeft>
          <AsteraAvatar size="big" />
        </AsteraContentLeft>
        <AsteraContentRight>
          <p>email: {user.email}</p>
          <p>joined: {user.created_at}</p>
        </AsteraContentRight>
      </AsteraContent>
    </>
  );
}
