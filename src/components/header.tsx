'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'
import { Button } from './ui/button'
import { Package } from 'lucide-react'
import { useSession } from '@/lib/auth-client'
import { SignOutButton } from './auth/sign-out-button'

const navItems = [
  {
    label: 'Gallery',
    href: '/gallery'
  },
  {
    label: 'Create asset',
    href: '/asset/create'
  }
]

export default function Header() {
  const { data: session, isPending } = useSession()
  const user = session?.user

  const isAdminUser = user?.role === 'admin'

  return (
    <header className='sticky top-0 z-10 border-b'>
      <div className='container mx-auto flex h-16 items-center justify-between px-4'>
        <div className='flex items-center gap-6'>
          <Package className='h-12 w-12 rounded-lg bg-teal-500 p-2 text-white' />
          <Link href='/' className='text-xl font-bold'>
            {' '}
            Nextjs Asset Platform 2025
          </Link>
          <nav className='hidden items-center gap-6 hover:text-teal-600 md:flex'>
            {navItems.map(item => (
              <Link
                className={cn(
                  'hover:text-primary text-sm font-medium transition-colors'
                )}
                key={item.href}
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          {!isPending && user && !isAdminUser && (
            <>
              <Link
                href='/dashboard/assets'
                className={cn(
                  'hover:text-primary text-sm font-medium transition-colors'
                )}
              >
                Assets
              </Link>
              <Link
                href='/dashboard/purchases'
                className={cn(
                  'hover:text-primary text-sm font-medium transition-colors'
                )}
              >
                My purchases
              </Link>
            </>
          )}
          {!isPending && user && isAdminUser && (
            <>
              <Link
                href='/admin/assets-approval'
                className={cn(
                  'hover:text-primary text-sm font-medium transition-colors'
                )}
              >
                Asset Approval
              </Link>
              <Link
                href='/admin/settings'
                className={cn(
                  'hover:text-primary text-sm font-medium transition-colors'
                )}
              >
                Settings
              </Link>
            </>
          )}
        </div>
        <div className='flex items-center gap-4'>
          <div className='hidden md:block'>
            {/* Keep a placeholder for search */}
          </div>
          <ThemeToggle />
          {!isPending && !user && (
            <div className='flex items-center gap-2'>
              <Button variant='default' asChild className='bg-teal-500'>
                <Link href='/auth'>Login/Register</Link>
              </Button>
            </div>
          )}
          {!isPending && user && <SignOutButton />}
        </div>
      </div>
    </header>
  )
}
