'use client'

import { Package } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './ui/dropdown-menu'
import { SignOutButton } from './auth/sign-out-button'
import { Avatar, AvatarFallback } from './ui/avatar'
import { useSession } from '@/lib/auth-client'

function Header() {
  const pathName = usePathname()

  const isLoginPage: boolean = pathName === '/login'

  const { data: session, isPending } = useSession()
  const user = session?.user
  const isAdminUser = user?.role === 'admin'

  if (isLoginPage) return null

  return (
    <header className='fixed top-0 right-0 left-0 z-50 border-b bg-white'>
      <div className='container flex h-16 items-center justify-between px-4'>
        <div className='flex items-center gap-4'>
          <Link href='/' className='flex items-center gap-2'>
            <div className='rounded-md bg-teal-500 p-2'>
              <Package className='h-5 w-5 text-white' />
            </div>
            <span className='text-xl font-bold text-teal-600'>
              Asset Platform
            </span>
          </Link>

          <nav className='ml-6 flex items-center gap-6'>
            {!isPending && user && isAdminUser ? null : (
              <Link
                href='/gallery'
                className='text-sm font-medium hover:text-teal-600'
              >
                Gallery
              </Link>
            )}

            {!isPending && user && !isAdminUser && (
              <>
                <Link
                  className='text-sm font-medium hover:text-teal-600'
                  href={'/dashboard/assets'}
                >
                  Assets
                </Link>
                <Link
                  className='text-sm font-medium hover:text-teal-600'
                  href={'/dashboard/purchases'}
                >
                  My Purchases
                </Link>
              </>
            )}

            {!isPending && user && isAdminUser && (
              <>
                <Link
                  className='text-sm font-medium hover:text-teal-600'
                  href={'/admin/asset-approval'}
                >
                  Asset Approval
                </Link>
                <Link
                  className='text-sm font-medium hover:text-teal-600'
                  href={'/admin/settings'}
                >
                  Settings
                </Link>
              </>
            )}
          </nav>
        </div>
        <div className='flex items-center gap-6'>
          {isPending ? null : user ? (
            <div className='flex items-center gap-3'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={'ghost'}
                    className='relative h-8 w-8 rounded-full'
                  >
                    <Avatar className='h-8 w-8 border border-slate-300'>
                      <AvatarFallback className='bg-teal-500 text-white'>
                        {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    <div className='sapce-y-1 flex flex-col'>
                      <p className='text-sm leading-none font-medium'>
                        {user.name}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <SignOutButton />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Link href='/auth'>
              <Button className='bg-teal-500 text-white hover:bg-teal-600'>
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
