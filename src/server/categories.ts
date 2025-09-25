'use server'
import { db } from '@/db'
import { category } from '@/db/schema'
import { auth } from '@/lib/auth'

import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { z } from 'zod'

const CategorySchema = z.object({
  name: z
    .string()
    .min(2, 'Category name must be at least 2 characters')
    .max(50, 'Category name must be max 50 characters')
})

export type CategoryFormValues = z.infer<typeof CategorySchema>

export async function addNewCategoryAction(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session?.user || session.user.role !== 'admin') {
    throw new Error('You must be an admin to add categories')
  }

  try {
    const name = formData.get('name') as string

    const validateFields = CategorySchema.parse({ name })

    const existingCategory = await db
      .select()
      .from(category)
      .where(eq(category.name, validateFields.name))
      .limit(1)

    if (existingCategory.length > 0) {
      return {
        success: false,
        message: 'category already exists! Please try with a different name'
      }
    }

    await db.insert(category).values({
      name: validateFields.name
    })

    revalidatePath('/admin/settings')
    return {
      success: true,
      message: 'New category added'
    }
  } catch (e) {
    console.log(e)

    return {
      success: false,
      message: 'Failed to add category'
    }
  }
}
