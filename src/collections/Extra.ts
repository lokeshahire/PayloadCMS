import type { CollectionConfig, Block } from 'payload'

//  select, text, textarea, checkbox, upload, relationTo, array, "collapsible", JSON, code, date, email, number, point, radio, "row", "tab", richText, blocks, "group"

const QuoteBlock: Block = {
  slug: 'Quote',
  imageURL: 'https://placehold.co/600x400?text=Hello\nWorld',
  imageAltText: 'A nice thumbnail image to show what this block looks like',
  interfaceName: 'QuoteBlock',
  fields: [
    {
      name: 'quoteHeader',
      type: 'text',
      required: true,
    },
    {
      name: 'quoteText',
      type: 'text',
    },
  ],
}

const Extra: CollectionConfig = {
  slug: 'extra',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    // text
    {
      name: 'title',
      type: 'text',
      required: true,
    },

    // textarea
    {
      name: 'description (textarea)',
      type: 'textarea',
      required: true,
    },

    // checkbox
    {
      name: 'enableCoolStuff',
      type: 'checkbox',
      label: 'I am Checkbox (checkbox)',
      defaultValue: false,
    },

    // upload
    {
      name: 'image (upload)',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },

    // array
    {
      name: 'slider ',
      type: 'array',
      label: 'Image Slider (array)',
      minRows: 2,
      maxRows: 10,
      interfaceName: 'CardSlider',
      labels: {
        singular: 'Slide',
        plural: 'Slides',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
    },

    // collapsible
    {
      type: 'collapsible',
      label: 'Additional Details (collapsible)',
      admin: {
        initCollapsed: false,
      },
      fields: [
        {
          name: 'notes',
          type: 'textarea',
          label: 'Notes',
        },
        {
          name: 'category',
          type: 'select',
          label: 'Category',
          options: [
            { label: 'Personal', value: 'personal' },
            { label: 'Work', value: 'work' },
            { label: 'Other', value: 'other' },
          ],
        },
      ],
    },

    // JSON
    {
      name: 'JSON',
      type: 'json',
      required: true,
    },

    // code
    {
      name: 'Code',
      type: 'code',
      required: true,
      admin: {
        language: 'javascript',
      },
    },

    // date
    {
      name: 'dateOnly',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'd MMM yyy',
        },
      },
    },
    {
      name: 'timeOnly',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'timeOnly',
          displayFormat: 'h:mm:ss a',
        },
      },
    },
    {
      name: 'monthOnly',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'monthOnly',
          displayFormat: 'MMMM yyyy',
        },
      },
    },

    // email
    {
      name: 'contact',
      type: 'email',
      label: 'Email Address',
      required: true,
    },

    //number
    {
      name: 'age',
      type: 'number',
      required: true,
      admin: {
        step: 1,
      },
    },

    // point
    {
      name: 'location',
      type: 'point',
      label: 'Location (point)',
    },

    // radio
    {
      name: 'color (radio)',
      type: 'radio',
      options: [
        {
          label: 'Mint',
          value: 'mint',
        },
        {
          label: 'Dark Gray',
          value: 'dark_gray',
        },
      ],
      defaultValue: 'mint',
      admin: {
        layout: 'horizontal',
      },
    },

    // row
    {
      type: 'row',
      fields: [
        {
          name: 'label(ROW)',
          type: 'text',
          required: true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'value',
          type: 'text',
          required: true,
          admin: {
            width: '50%',
          },
        },
      ],
    },

    // tab
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Tab One',
          description: 'This will appear within the tab above the fields.',
          fields: [
            {
              name: 'someTextField',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'tabTwo',
          label: 'Tab Two',
          interfaceName: 'TabTwo',
          fields: [
            {
              name: 'numberField',
              type: 'number',
              required: true,
            },
          ],
        },
      ],
    },

    // richText
    {
      name: 'richText',
      type: 'richText',
      label: 'Rich Text',
    },

    //Block
    {
      name: 'layout (Block)',
      type: 'blocks',
      minRows: 1,
      maxRows: 20,
      blocks: [QuoteBlock],
    },

    // group
    {
      name: 'pageMeta (Group)',
      type: 'group',
      interfaceName: 'Meta',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          minLength: 20,
          maxLength: 100,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          minLength: 40,
          maxLength: 160,
        },
      ],
    },
  ],
}

export default Extra
