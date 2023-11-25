import { useState } from 'react'
import { useSelector } from 'react-redux'
import { getAuth, updateProfile } from 'firebase/auth'
import UpsertPopup from '../form/UpsertPopup'

const UpdateUser = (props) => {
  const { currentUser, setCurrentUser } = props
  const app = useSelector((state) => state.firebase.app)
  const auth = getAuth(app)
  const [visible, setVisible] = useState(false)
  const toggle = () => setVisible(!visible)

  const save = async (data) => {
    const submit = { displayName: data.displayName, photoURL: data.file }
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
        data={
          currentUser ? { displayName: currentUser.displayName, file: currentUser.photoURL } : {}
        }
        fileLocaion={{ file: 'avatar' }}
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
