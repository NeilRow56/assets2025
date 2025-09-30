import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  insertCategorySchemaType,
  insertCategorySchema
} from '@/zod-schemas/categories'
import { Category, User } from '@/db/schema'

import { InputWithLabel } from '@/components/form/input-with-label'
import { Button } from '@/components/ui/button'

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  user: User // You must have a user to start a customer - so it is not optional
  category?: Category
}

function AddCategoryDialog({ setOpen, open, user, category }: Props) {
  const defaultValues: insertCategorySchemaType = {
    id: category?.id ?? 0,
    name: category?.name ?? '',
    userId: category?.userId ?? user.id
  }

  const form = useForm<insertCategorySchemaType>({
    resolver: zodResolver(insertCategorySchema),
    mode: 'onBlur',
    defaultValues
  })

  async function submitForm(data: insertCategorySchemaType) {
    console.log(data)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <div className='items-center justify-center'>
                <h2 className='text-primary text-xl font-bold lg:text-3xl'>
                  {category?.id ? 'Edit' : 'New'} Category{' '}
                  {category?.id ? `#${category.id}` : 'Form'}
                </h2>
              </div>
            </DialogTitle>

            <DialogDescription>
              Create or edit categories here. Click save when you&apos;re done.
            </DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(submitForm)}
                className='space-y-1'
              >
                <InputWithLabel<insertCategorySchemaType>
                  fieldTitle='Name'
                  nameInSchema='name'
                />

                <div className='mt-4 flex justify-between'>
                  <Button
                    type='submit'
                    className='w-1/4'
                    variant='default'
                    title='Save'
                  >
                    Save
                  </Button>

                  <Button
                    type='button'
                    className='mr-4 w-1/4'
                    variant='destructive'
                    title='Reset'
                    onClick={() => {
                      form.reset(defaultValues)
                    }}
                  >
                    Reset
                  </Button>
                </div>
              </form>
            </Form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AddCategoryDialog
