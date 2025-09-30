import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  getAllCategoriesAction,
  getTotalAssetsCountAction,
  getTotalUsersCountAction
} from '@/server/admin-actions'

import { Users } from 'lucide-react'

async function SettingsPage() {
  const [categories, userCount, assetsCount] = await Promise.all([
    getAllCategoriesAction(),
    getTotalUsersCountAction(),
    getTotalAssetsCountAction()
  ])

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
            <p className='text-3xl font-bold text-teal-600'>{userCount}</p>
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
          CATEGORY MANAGER COMPONENT
        </CardContent>
      </Card>
    </div>
  )
}

export default SettingsPage
