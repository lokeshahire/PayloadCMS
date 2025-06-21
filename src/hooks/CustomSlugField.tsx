'use client'
import { generateSlug } from '@/lib/utils'
import { TextField, useField } from '@payloadcms/ui'
import { UIFieldServerComponent, UIFieldServerProps } from 'payload'
import { useEffect } from 'react'

const CustomSlugField: UIFieldServerComponent = (props: UIFieldServerProps) => {
  const { value: title } = useField<string>({ path: 'title' })
  const { value: id } = useField<string>({ path: 'createdAt' })
  const { setValue } = useField({
    path: 'slug',
  })

  useEffect(() => {
    if (!id && title) {
      const generatedSlug = generateSlug(title)
      setValue(generatedSlug) 
    }
  }, [title, id, setValue])

  return (
    <TextField
      path="slug"
      readOnly={id ? true : false}
      field={{
        type: 'text',
        name: 'slug',
        label: 'Slug',
        required: true,
        unique: true,
        admin: {
          rtl: false,
          position: 'sidebar',
          autoComplete: 'off',
          placeholder: id ? 'Contact dev team' : '',
        },
      }}
    />
  )
}

export default CustomSlugField
