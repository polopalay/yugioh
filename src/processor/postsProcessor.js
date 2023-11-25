const postsProcessor = {}
let post = [{ id: 0, name: 'Bằng', userName: 'User' }]
postsProcessor.getAll = async () => {
  return post
}
postsProcessor.upsert = async (data) => {
  post.push(data)
  return { isSuccess: true, data: 'Cập nhật thành công' }
}

postsProcessor.delete = async (id) => {
  post = post.filter((item) => item.id !== id)
  return { isSuccess: true, data: 'Xoá thành công' }
}

export default postsProcessor
