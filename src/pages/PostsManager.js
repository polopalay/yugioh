// import { useState } from 'react'
import { Image } from 'primereact/image'
import Crud from '../components/form/Crud'
import postsProcessor from '../processor/postsProcessor'

const moduleName = 'người dùng'
const processor = postsProcessor

const PostsManager = () => {
  const column = [
    { value: 'title', name: 'Tiêu đề', sortable: true },
    { value: 'author', name: 'Tác giả', sortable: true },
    { value: 'date', name: 'Ngày tạo', sortable: true },
    {
      value: 'thumnail',
      name: 'Ảnh mô tả',
      render: (data) => <Image src={data.thumnail} imageClassName="w-20rem" alt="alt" />,
    },
  ]

  const config = {
    fields: ['author', 'title', 'thumnail', 'date', 'description', 'content'],
    maxLength: { author: 20, title: 80, description: 300 },
    col: { author: 12, date: 12, title: 12, thumnail: 12, description: 12, content: 12 },
    required: ['author', 'title'],
    types: { content: 'editor', thumnail: 'file', description: 'text-area', date: 'date' },
    name: {
      author: 'Tác giả',
      thumnail: 'Ảnh mô tả',
      description: 'Chú thích',
      title: 'Tiêu đề',
      content: 'Nội dung',
      date: 'Ngày tạo',
    },
  }

  return (
    <>
      <Crud
        processor={processor}
        moduleName={moduleName}
        column={column}
        upsert={config}
        module="posts"
      />
    </>
  )
}

export default PostsManager
