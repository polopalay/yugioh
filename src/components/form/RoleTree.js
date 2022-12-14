import { Tree } from 'primereact/tree'
import { Button } from 'primereact/button'
import { useEffect, useState } from 'react'
import { convertToPermission } from '../../utils/convertToTree'
import permissionProcessor from '../../processor/permissionProcessor'
import Modal from '../popup/Modal'
import roleProcessor from '../../processor/roleProcessor'

const RoleTree = (props) => {
  const { onSave, id } = props

  const [permissions, setPermissions] = useState([])
  const [visible, setVisible] = useState(false)
  const [selected, setSelected] = useState([])

  const toggle = () => setVisible(!visible)
  const getPermissions = async () => {
    const rs = await permissionProcessor.getAll()
    convertToPermission(rs)
    setPermissions(rs)
  }
  const getSelected = async () => {
    const rs = await roleProcessor.rolePermission(id)
    const selectedKeys = {}
    rs.forEach((i) => {
      selectedKeys[i] = { checked: true }
    })
    setSelected(selectedKeys)
  }

  useEffect(() => {
    getPermissions()
  }, [])
  useEffect(() => {
    if (id) {
      getSelected()
    }
  }, [id])

  const header = 'Phân quyền'
  const footer = () => (
    <div className="flex justify-content-end w-full pt-2">
      <Button
        label="Huỷ"
        className="p-button-secondary mr-2"
        onClick={() => {
          if (toggle) toggle()
        }}
      />
      <Button
        onClick={() => {
          if (toggle) toggle()
          if (onSave) {
            onSave(
              id,
              Object.keys(selected).map((item) => parseInt(item, 10)),
            )
          }
        }}
        label="Lưu"
      />
    </div>
  )
  return (
    <>
      <Modal visible={visible} toggle={toggle} header={header} footer={footer} width="50%">
        <Tree
          value={permissions}
          selectionMode="checkbox"
          selectionKeys={selected}
          onSelectionChange={(e) => {
            setSelected(e.value)
          }}
        />
      </Modal>
      <Button
        icon="pi pi-sitemap"
        className="p-button-rounded p-button-success mr-2"
        onClick={toggle}
        // tooltip="Phân quyền"
        tooltipOptions={{ position: 'top' }}
      />
    </>
  )
}

export default RoleTree
