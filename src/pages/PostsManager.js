// import { useState } from 'react'
import Crud from '../components/form/Crud'
// import Editor from '../components/form/Editor'
import postsProcessor from '../processor/postsProcessor'

const moduleName = 'người dùng'
const processor = postsProcessor

const PostsManager = () => {
  const column = [
    { value: 'author', name: 'Tác giả', sortable: true },
    { value: 'date', name: 'Ngày tạo', sortable: true },
  ]

  const config = {
    fields: ['author', 'date'],
    maxLength: { userName: 20, name: 100 },
    required: ['author'],
    types: { date: 'date' },
    name: {
      author: 'Tác giả',
      date: 'Ngày tạo',
    },
  }

  return (
    <>
      {
        // <Editor setEditor={setEditor} />
      }
      <Crud
        processor={processor}
        moduleName={moduleName}
        column={column}
        upsert={config}
        src="posts"
      />
    </>
  )
}

export default PostsManager
