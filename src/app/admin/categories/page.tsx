import { AddCategoryButton } from '@/components/admin/add-category-button'
import { BackButton } from '@/components/back-button'
import { EmptyState } from '@/components/emply-state'
import { SkeletonArray } from '@/components/skeleton'
import { SkeletonCustomerCard } from '@/components/skeleton-customer-card'
import { getUserCategories } from '@/server/categories'
import { getCurrentUserId, getUserDetails } from '@/server/users'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

export default async function Categories() {
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

    if (data.length === 0) {
      return (
        <>
          <div className='mx-auto flex max-w-6xl flex-col gap-2'>
            <EmptyState
              title='Categories'
              description='You have no categories yet. Click on the button below to create your first category'
            />
          </div>

          <div className='- mt-12 flex w-full justify-center'>
            <AddCategoryButton user={user} />
          </div>
        </>
      )
    }

    return (
      <>
        <div className='container mx-auto max-w-2xl py-10'>
          <Suspense
            fallback={
              <SkeletonArray amount={3}>
                <SkeletonCustomerCard />
              </SkeletonArray>
            }
          >
            Category Table
          </Suspense>
        </div>
      </>
    )
  }
}
