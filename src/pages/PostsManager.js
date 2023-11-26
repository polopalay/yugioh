import { Image } from 'primereact/image'
import { useSelector } from 'react-redux'
import Crud from '../components/form/Crud'
import postsProcessor from '../processor/postsProcessor'

const moduleName = 'bài viết'
const processor = postsProcessor

const PostsManager = () => {
  const app = useSelector((state) => state.firebase.app)
  processor.init(app)
  const column = [
    { value: 'title', name: 'Tiêu đề', sortable: true },
    { value: 'author', name: 'Tác giả', sortable: true },
    {
      value: 'thumnail',
      name: 'Ảnh mô tả',
      render: (data) => <Image src={data.thumnail} imageClassName="w-20rem" alt="alt" />,
    },
  ]

  const config = {
    fields: ['title', 'thumnail', 'description', 'content'],
    maxLength: { title: 80, description: 300 },
    col: { title: 12, thumnail: 12, description: 12, content: 12 },
    required: ['title'],
    types: { content: 'editor', thumnail: 'file', description: 'text-area' },
    name: {
      thumnail: 'Ảnh mô tả',
      description: 'Chú thích',
      title: 'Tiêu đề',
      content: 'Nội dung',
    },
  }

  return (
    <>
      <Crud processor={processor} moduleName={moduleName} column={column} upsert={config} />
    </>
  )
}

export default PostsManager
