import { get, getDatabase, push, ref, remove, update } from 'firebase/database'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { jsonToList } from '../utils/format'

const module = 'gallery'
const galleryProcessor = {}
let database
let user

galleryProcessor.init = (app) => {
  database = getDatabase(app)
  const auth = getAuth(app)
  onAuthStateChanged(auth, (u) => {
    user = u
  })
}
galleryProcessor.getOne = async (id) => {
  const nodeRef = ref(database, `${module}/${id}`)
  const contentRef = ref(database, `contents/${id}`)
  const post = (await get(nodeRef)).val()
  const content = (await get(contentRef)).val()
  return { id, ...post, content: content.content }
}
galleryProcessor.getAll = async () => {
  const dataRef = ref(database, module)
  const rs = await get(dataRef)
  const rawList = rs.val()
  const list = jsonToList(rawList)
  return list.reverse()
}
galleryProcessor.upsert = async (data) => {
  if (data.id) {
    const nodeRef = ref(database, `${module}/${data.id}`)
    const contentRef = ref(database, `contents/${data.id}`)
    await update(nodeRef, {
      ...data,
      author: user ? user.displayName : '',
      content: null,
      id: null,
    })
    await update(contentRef, { content: data.content })
  } else {
    const dataRef = ref(database, module)
    const post = await push(dataRef, {
      ...data,
      author: user ? user.displayName : '',
      content: null,
    })
    const { key } = await get(post)
    const contentRef = ref(database, `contents/${key}`)
    await update(contentRef, { content: data.content })
  }
  return { type: 'success', message: data.id ? 'Cập nhật thành công' : 'Thêm thành công' }
}

galleryProcessor.delete = async (id) => {
  const postRef = ref(database, `${module}/${id}`)
  await remove(postRef)
  const contentRef = ref(database, `contents/${id}`)
  await remove(contentRef)
  return { type: 'success', message: 'Xoá thành công' }
}

export default galleryProcessor
