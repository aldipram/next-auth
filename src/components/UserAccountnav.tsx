"use client"

import { Button } from './ui/button'
import { signOut } from 'next-auth/react';

const UserAccountnav = () => {

  return (
    <Button variant="destructive" onClick={() => signOut({
        redirect: true,
        callbackUrl: `${window.location.origin}/sign-in`,
      })}>
        Sign Out
    </Button>
  )
}

export default UserAccountnav