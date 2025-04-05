import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { auth, signOut, signIn } from '@/auth';

const Navbar = async () => {

  const session = await auth()

  return (
    <header className='px-5 py-3 bg-white shadow-sm font-work-sams'>
      <nav className='flex justify-between items-center'>
        <Link href="/">
          <Image
            className='bg-transparent'
            src="/logo.png" alt="logo" width={130} height={25} />
        </Link>

        <div className='flex items-center gap-5 text-black'>
          {session && session?.user ? (
            <>
              <Link href='/startup/create'>
                <span>Create</span>
              </Link>

              <form action={async () => {
                'use server';
                await signOut({ redirectTo: '/'});
              }}>
                <button type='submit'>LogOut</button>
              </form>

              <Link href={`/user/${session?.id}`}>
                <Image src={session?.user?.image || ''} alt={session?.user?.name || ''} width={45} height={45}
                className='rounded-full'/>
              </Link>
            </>
          ) : (
            <form action={async () => {
              'use server';
              await signIn('github')
            }}>
              <button type='submit'>
                Login
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar