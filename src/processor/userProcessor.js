const userProcessor = {}
let users = [{ id: 0, name: 'Bằng', userName: 'User' }]
userProcessor.getAll = async () => {
  return users
}
userProcessor.upsert = async (data) => {
  users.push(data)
  return { isSuccess: true, data: 'Cập nhật thành công' }
}

userProcessor.delete = async (id) => {
  users = users.filter((item) => item.id !== id)
  return { isSuccess: true, data: 'Xoá thành công' }
}

export default userProcessor
