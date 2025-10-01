import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function GalleryPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (session && session.user.role === 'admin') redirect('/admin/settings')
  return <div>Gallery Page</div>
}
