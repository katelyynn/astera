"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AsteraCard, AsteraContent, AsteraContentInner, AsteraContentLeft, AsteraContentRight, AsteraContentWash } from "../_components/card/card";
import { AsteraInput, AsteraInputBlock } from "../_components/input/input";
import { AsteraAlert } from "../_components/alert/alert";
import { AsteraButon } from "../_components/buton/buton";

export default function Register() {
  const [email, set_email] = useState('');
  const [password, set_password] = useState('');
  const [error, set_error] = useState('');
  const router = useRouter();

  const handle_submit = async (e) => {
    e.preventDefault();
    set_error('');

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    });

    const data = await res.json();
    if (!res.ok) {
      set_error(data.error || 'something went wrong');
      return;
    }

    router.push('/');
  }

  return (
    <>
      <AsteraContentWash>
        <h1>login</h1>
      </AsteraContentWash>
      <AsteraContent>
        <AsteraContentLeft></AsteraContentLeft>
        <AsteraContentRight>
          <AsteraContentInner>
            <form onSubmit={handle_submit}>
              <AsteraInput label="email" type="email" value={email} on_change={(e) => set_email(e.target.value)} required />
              <AsteraInput label="password" type="password" value={password} on_change={(e) => set_password(e.target.value)} required />
              <AsteraInputBlock>
                <AsteraButon type="submit">
                  login
                </AsteraButon>
              </AsteraInputBlock>
            </form>
            {error && <AsteraAlert label={error} type="error" />}
          </AsteraContentInner>
        </AsteraContentRight>
      </AsteraContent>
    </>
  )
}
