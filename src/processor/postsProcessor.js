const postsProcessor = {}
let users = [{ id: 0, name: 'Bằng', userName: 'User' }]
postsProcessor.getAll = async () => {
  return users
}
postsProcessor.upsert = async (data) => {
  users.push(data)
  return { isSuccess: true, data: 'Cập nhật thành công' }
}

postsProcessor.delete = async (id) => {
  users = users.filter((item) => item.id !== id)
  return { isSuccess: true, data: 'Xoá thành công' }
}

export default postsProcessor
