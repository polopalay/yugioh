// import { useState } from 'react'
import Crud from '../components/form/Crud'
import postsProcessor from '../processor/postsProcessor'

const moduleName = 'người dùng'
const processor = postsProcessor

const PostsManager = () => {
  const column = [
    { value: 'author', name: 'Tác giả', sortable: true },
    // { value: 'date', name: 'Ngày tạo', sortable: true },
  ]

  const config = {
    fields: ['author', 'title', 'content'],
    maxLength: { author: 20, title: 30 },
    col: { author: 12, title: 12, content: 12 },
    required: ['author', 'title'],
    types: { content: 'editor' },
    name: {
      author: 'Tác giả',
      title: 'Tiêu đề',
      content: 'Nội dung',
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
