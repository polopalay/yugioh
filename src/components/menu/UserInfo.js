import { useState } from 'react'
import { Image } from 'primereact/image'
import Modal from '../popup/Modal'

const UserInfo = (props) => {
  const { currentUser } = props
  const [visible, setVisible] = useState(false)
  const toggle = () => setVisible(!visible)
  return (
    <>
      <Modal visible={visible} toggle={toggle} width={500}>
        <div className="w-full flex flex-column justify-content-center pt-3">
          <div className="w-full border-circle">
            <h4 className="text-center">{currentUser && currentUser.displayName}</h4>
            <Image
              src={currentUser && currentUser.photoURL}
              width="100%"
              height="100%"
              imageStyle={{ objectFit: 'cover', borderRadius: '50%' }}
            />
          </div>
        </div>
      </Modal>
      <button type="button" className="p-link" onClick={toggle}>
        <i className="pi pi-user pi-fw" />
        <span>Thông tin cá nhân</span>
      </button>
    </>
  )
}

export default UserInfo
