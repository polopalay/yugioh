/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage'
import { getAuth, updateProfile } from 'firebase/auth'
import UpsertPopup from '../form/UpsertPopup'

const UpdateUser = (props) => {
  const { currentUser, setCurrentUser } = props
  const app = useSelector((state) => state.firebase.app)
  const auth = getAuth(app)
  const storage = getStorage(app)
  const toast = useSelector((state) => state.notify.toast)
  const [visible, setVisible] = useState(false)
  const toggle = () => setVisible(!visible)

  const save = async (data) => {
    let avatar
    if (data.file) {
      const storageRef = ref(storage, `avatar/${currentUser.uid}`)
      const rsUpload = await uploadBytes(storageRef, data.file).catch((e) => {
        toast({ type: 'error', message: e.message })
      })
      if (rsUpload) avatar = await getDownloadURL(rsUpload.ref)
    }
    const submit = { displayName: data.displayName }
    if (avatar) submit.photoURL = avatar
    await updateProfile(currentUser, submit)
    currentUser.reload()
    setCurrentUser({ ...auth.currentUser })
    toggle()
  }
  return (
    <>
      <UpsertPopup
        width="60%"
        visible={visible}
        toggle={toggle}
        header="Chỉnh sửa thông tin người dùng"
        data={currentUser ? { displayName: currentUser.displayName } : {}}
        onSave={save}
        fields={['displayName', 'file']}
        name={{ displayName: 'Họ tên', file: 'Ảnh đại diện' }}
        types={{ file: 'file' }}
      />

      <button type="button" className="p-link" onClick={toggle}>
        <i className="pi pi-cog pi-fw" />
        <span>Cài đặt</span>
      </button>
    </>
  )
}
export default UpdateUser
