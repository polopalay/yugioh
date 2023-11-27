import { Image } from 'primereact/image'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Crud from '../components/form/Crud'
import galleryProcessor from '../processor/galleryProcessor'
import postsProcessor from '../processor/postsProcessor'

const moduleName = 'bài viết'
const processor = galleryProcessor

const GalleryManager = () => {
  const [posts, setPosts] = useState([])
  const app = useSelector((state) => state.firebase.app)

  useEffect(async () => {
    const rs = await postsProcessor.getAll()
    setPosts(
      rs
        .map((item) => {
          return { ...item, name: item.title }
        })
        .reverse(),
    )
  }, [])

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
    fields: ['title', 'thumnail', 'description', 'posts'],
    maxLength: { title: 80, description: 300 },
    col: { title: 12, thumnail: 12, description: 12, posts: 12 },
    required: ['title'],
    types: { thumnail: 'file', description: 'text-area', posts: 'multiple-select' },
    name: {
      thumnail: 'Ảnh mô tả',
      description: 'Chú thích',
      title: 'Tiêu đề',
    },
    options: { posts },
  }

  return <Crud processor={processor} moduleName={moduleName} column={column} upsert={config} />
}

export default GalleryManager
