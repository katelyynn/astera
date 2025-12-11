"use client";

import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AsteraCard, AsteraContent, AsteraContentLeft, AsteraContentRight, AsteraContentWash } from "../_components/card/card";
import { AsteraInput, AsteraInputBlock } from "../_components/input/input";
import { AsteraAlert } from "../_components/alert/alert";
import { AsteraButon } from "../_components/buton/buton";

interface User {
  username: string,
  email: string,
  about: string;
}

export default function Settings() {
  const [user, set_user] = useState({});
  const [username, set_username] = useState('');
  const [email, set_email] = useState('');
  const [password, set_password] = useState('');
  const [about, set_about] = useState('');
  const [error, set_error] = useState('');
  const [success, set_success] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetch_settings = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/settings`, {
        credentials: 'include',
        cache: 'no-store'
      });

      if (!res.ok) {
        redirect('/login');
        return;
      }

      const data = await res.json();

      set_user(data);
      set_username(data.username);
      set_email(data.email);
      set_about(data.about);
    };
    fetch_settings();
  }, []);

  const handle_submit = async (e) => {
    e.preventDefault();
    set_error('');

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/settings`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password, about }),
      credentials: 'include'
    });

    const data = await res.json();
    if (!res.ok) {
      set_error(data.error || 'something went wrong');
      return;
    }

    set_success('saved changes');
  }

  if (!user) return <p>loading</p>;

  return (
    <>
      <AsteraContentWash>
        <h1>{user.username}&rsquo;s settings</h1>
      </AsteraContentWash>
      <AsteraContent>
        <AsteraContentLeft>

        </AsteraContentLeft>
        <AsteraContentRight>
          <form onSubmit={handle_submit}>
            <AsteraInput label="username" type="username" value={username} on_change={(e) => set_username(e.target.value)} />
            <AsteraInput label="email" type="email" value={email} on_change={(e) => set_email(e.target.value)} />
            <AsteraInput label="password" type="password" value={password} on_change={(e) => set_password(e.target.value)} />
            <AsteraInput label="about" textarea value={about} on_change={(e) => set_about(e.target.value)} />
            <AsteraInputBlock>
              <AsteraButon type="submit">
                save
              </AsteraButon>
            </AsteraInputBlock>
          </form>
          {error && <AsteraAlert label={error} type="error" />}
          {success && <AsteraAlert label={success} type="success" />}
        </AsteraContentRight>
      </AsteraContent>
    </>
  )
}
