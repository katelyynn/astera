import { AsteraAbout } from "@/app/_components/about/about";
import { AsteraAlert } from "@/app/_components/alert/alert";
import { AsteraAvatar } from "@/app/_components/avatar/avatar";
import { AsteraCard, AsteraContent, AsteraContentLeft, AsteraContentRight, AsteraContentWash } from "@/app/_components/card/card";
import { AsteraInfoBox, AsteraInfoBoxList, AsteraSummary, AsteraSummaryList } from "@/app/_components/infobox/infobox";
import { AsteraTime } from "@/app/_components/time/time";

export interface User {
  id: string,
  username: string,
  email: string,
  joined: string,
  about: string
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
          <AsteraAbout value={user.about || `seems ${user.username} is staying mysterious for now`} />
          <AsteraInfoBoxList>
            <AsteraInfoBox label="information">
              <AsteraSummaryList>
                <AsteraSummary label="joined"><AsteraTime time={user.joined} /></AsteraSummary>
                <AsteraSummary label="goes by">she/her</AsteraSummary>
                <AsteraSummary label="plays">156,438</AsteraSummary>
              </AsteraSummaryList>
            </AsteraInfoBox>
            <AsteraInfoBox label="friends">
              <AsteraSummary label="total">54</AsteraSummary>
            </AsteraInfoBox>
          </AsteraInfoBoxList>
        </AsteraContentLeft>
        <AsteraContentRight>

        </AsteraContentRight>
      </AsteraContent>
    </>
  );
}
