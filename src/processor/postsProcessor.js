import { get, getDatabase, push, ref, remove, update } from 'firebase/database'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { jsonToList } from '../utils/format'

const postsProcessor = {}
let database
let user

postsProcessor.init = (app) => {
  database = getDatabase(app)
  const auth = getAuth(app)
  onAuthStateChanged(auth, (u) => {
    user = u
  })
}
postsProcessor.getOne = async (id) => {
  const nodeRef = ref(database, `posts/${id}`)
  const contentRef = ref(database, `contents/${id}`)
  const post = (await get(nodeRef)).val()
  const content = (await get(contentRef)).val()
  return { id, ...post, content: content.content }
}
postsProcessor.getAll = async () => {
  const dataRef = ref(database, 'posts')
  const rs = await get(dataRef)
  const rawList = rs.val()
  if (!rawList) return []
  const list = jsonToList(rawList)
  return list.reverse()
}
postsProcessor.upsert = async (data) => {
  if (data.id) {
    const nodeRef = ref(database, `posts/${data.id}`)
    const contentRef = ref(database, `contents/${data.id}`)
    await update(nodeRef, {
      ...data,
      uid: user ? user.uid : '',
      author: user ? user.displayName : '',
      content: null,
      id: null,
    })
    await update(contentRef, { content: data.content, uid: user ? user.uid : '' })
  } else {
    const dataRef = ref(database, 'posts')
    const post = await push(dataRef, {
      ...data,
      uid: user ? user.uid : '',
      author: user ? user.displayName : '',
      content: null,
    })
    const { key } = await get(post)
    const contentRef = ref(database, `contents/${key}`)
    await update(contentRef, { content: data.content, uid: user ? user.uid : '' })
  }
  return { type: 'success', message: data.id ? 'Cập nhật thành công' : 'Thêm thành công' }
}

postsProcessor.delete = async (id) => {
  const postRef = ref(database, `posts/${id}`)
  await remove(postRef)
  const contentRef = ref(database, `contents/${id}`)
  await remove(contentRef)
  return { type: 'success', message: 'Xoá thành công' }
}

export default postsProcessor
