import { AddCategoryButton } from '@/components/admin/add-category-button'
import CategoriesTable from '@/components/admin/categories-table'
import { BackButton } from '@/components/back-button'
import { EmptyState } from '@/components/empty-state'
import { SkeletonArray } from '@/components/skeleton'
import { SkeletonCustomerCard } from '@/components/skeleton-customer-card'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { db } from '@/db'
import { categories } from '@/db/schema'

import {
  getTotalAssetsCountAction,
  getTotalUsersCountAction
} from '@/server/admin-actions'
import { getUserCategories } from '@/server/categories'
import { getCurrentUserId, getUserDetails } from '@/server/users'
import { count } from 'drizzle-orm'

import { Users } from 'lucide-react'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

async function SettingsPage() {
  const [userCount, assetsCount] = await Promise.all([
    getTotalUsersCountAction(),
    getTotalAssetsCountAction()
  ])

  const { userId } = await getCurrentUserId()
  if (userId == null) return redirect('/auth/sign-in')

  if (userId) {
    const user = await getUserDetails(userId)

    if (!user) {
      return (
        <>
          <h2 className='mb-2 text-2xl'>User ID #{userId} not found</h2>
          <BackButton
            title='Go Back'
            variant='default'
            className='flex w-[100px]'
          />
        </>
      )
    }

    const data = await getUserCategories(userId)

    const categoryCount = await db
      .select({ rowCount: count() })
      .from(categories)

    const total = categoryCount[0].rowCount

    if (data.length === 0) {
      return (
        <>
          <div className='mx-auto mt-24 flex max-w-6xl flex-col gap-2'>
            <EmptyState
              title='Categories'
              description='You have no categories yet. Click on the button below to create your first category'
            />
          </div>

          <div className='- mt-12 flex w-full justify-center'>
            {/* <Button asChild size='lg' className='i flex w-[200px]'>
              <Link href='/admin/categories/form'>Create Category</Link>
            </Button> */}
            <AddCategoryButton user={user} />
          </div>
        </>
      )
    }

    return (
      <div className='container py-10'>
        <h1 className='mb-5 text-3xl font-bold'>Admin Settings</h1>
        <div className='mb-7 grid grid-cols-1 gap-5 md:grid-cols-3'>
          <Card className='bg-white'>
            <CardHeader className='pb-2'>
              <CardTitle className='flex items-center text-lg font-medium'>
                <Users className='mr-2 h-5 w-5 text-teal-500' />
                Total Users
              </CardTitle>
              <CardDescription>
                All registered users on the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-3xl font-bold text-teal-600'>{userCount} </p>
            </CardContent>
          </Card>
          <Card className='bg-white'>
            <CardHeader className='pb-2'>
              <CardTitle className='flex items-center text-lg font-medium'>
                <Users className='mr-2 h-5 w-5 text-teal-500' />
                Total Assets
              </CardTitle>
              <CardDescription>
                All uploaded assets on the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-3xl font-bold text-teal-600'>{assetsCount}</p>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Category Management</CardTitle>
          </CardHeader>
          <CardContent>
            {/* <CategoryManager categories={category} /> */}

            <Suspense
              fallback={
                <SkeletonArray amount={3}>
                  <SkeletonCustomerCard />
                </SkeletonArray>
              }
            >
              <CategoriesTable data={data} total={total} user={user} />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    )
  }
}
export default SettingsPage
