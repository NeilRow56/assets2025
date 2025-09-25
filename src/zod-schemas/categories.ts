import { z } from 'zod/v4'

import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { category } from '@/db/schema'

export const insertCategorySchema = createInsertSchema(category, {
  // id: schema =>
  //   schema
  //     .min(1, 'ID is required')
  //     .max(100, { error: 'ID must be at most 100 characters!' }),
  name: schema =>
    schema
      .min(1, 'Name is required')
      .max(100, { error: 'Name must be at most 100 characters!' })
})

export const selectCategorySchema = createSelectSchema(category)

export type insertCategorySchemaType = z.infer<typeof insertCategorySchema>

export type selectCategorySchemaType = z.infer<typeof selectCategorySchema>
