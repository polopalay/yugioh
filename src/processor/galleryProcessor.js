import { get, getDatabase, push, ref, remove, update } from 'firebase/database'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { jsonToList } from '../utils/format'

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
  const nodeRef = ref(database, `gallery/${id}`)
  const post = (await get(nodeRef)).val()
  return { id, ...post }
}
galleryProcessor.getAll = async () => {
  const dataRef = ref(database, 'gallery')
  const rs = await get(dataRef)
  const rawList = rs.val()
  if (!rawList) return []
  const list = jsonToList(rawList)
  return list.reverse()
}
galleryProcessor.upsert = async (data) => {
  if (data.id) {
    const nodeRef = ref(database, `gallery/${data.id}`)
    await update(nodeRef, {
      ...data,
      uid: user ? user.uid : '',
      author: user ? user.displayName : '',
      posts: null,
      id: null,
    })
  } else {
    const dataRef = ref(database, 'gallery')
    await push(dataRef, {
      ...data,
      uid: user ? user.uid : '',
      author: user ? user.displayName : '',
    })
  }
  return { type: 'success', message: data.id ? 'Cập nhật thành công' : 'Thêm thành công' }
}

galleryProcessor.delete = async (id) => {
  const postRef = ref(database, `gallery/${id}`)
  await remove(postRef)
  return { type: 'success', message: 'Xoá thành công' }
}

export default galleryProcessor
