/* eslint-disable max-lines-per-function */
import { useEffect, useState } from 'react'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { useSelector } from 'react-redux'
import { getDatabase, onValue, ref, push, update, remove } from 'firebase/database'
import UpsertPopup from './UpsertPopup'
import Table from '../layout/Table'
import { jsonToList } from '../../utils/format'

function Crud(props) {
  const { moduleName, column, upsert, table, toolbar, chucNang, src } = props
  const [oneData, setOneData] = useState({})
  const app = useSelector((state) => state.firebase.app)
  const [data, setData] = useState([])
  const database = getDatabase(app)
  const dataRef = ref(database, src)
  useEffect(() => {
    onValue(dataRef, (snapshot) => {
      const rawList = snapshot.val()
      const list = jsonToList(rawList)
      setData(list)
    })
  }, [])
  const [visible, setVisible] = useState(false)
  const toast = useSelector((store) => store.notify.toast)
  const confirm = useSelector((store) => store.notify.confirm)
  const toggle = () => setVisible(!visible)
  const save = async (value) => {
    if (value.id) {
      const nodeRef = ref(database, `${src}/${value.id}`)
      update(nodeRef, { ...value, id: null })
    } else {
      push(dataRef, value)
    }
    toggle()
    toast({ type: 'success', message: value.id ? 'Cập nhật thành công' : 'Thêm thành công' })
  }
  const deleteOnClick = async (id) => {
    const nodeRef = ref(database, `${src}/${id}`)
    await remove(nodeRef)
    toast({ type: 'success', message: 'Xoá thành công' })
  }
  const columnTable = [
    ...column,
    {
      name: 'Chức năng',
      alignHeader: 'center',
      render: (value) => {
        return (
          <div className="flex justify-content-center">
            {chucNang && chucNang(value)}
            <Button
              icon="pi pi-pencil"
              className="p-button-rounded p-button-warning mr-2"
              onClick={() => {
                setOneData(value)
                toggle()
              }}
              tooltipOptions={{ position: 'top' }}
            />
            <Button
              icon="pi pi-trash"
              className="p-button-rounded p-button-danger mr-2"
              onClick={() => {
                confirm({
                  action: () => deleteOnClick(value.id),
                  body: `Bạn có muốn xoá ${moduleName} này?`,
                })
              }}
              tooltipOptions={{ position: 'top' }}
            />
          </div>
        )
      },
    },
  ]
  const tableHeader = `Danh sách ${moduleName}`
  const header = !oneData.id ? `Thêm mới ${moduleName}` : `Chỉnh sửa ${moduleName}`
  const configUpsert = { visible, toggle, header }
  Object.keys(upsert).forEach((key) => {
    configUpsert[key] = typeof upsert[key] === 'function' ? upsert[key](oneData) : upsert[key]
  })
  return (
    <>
      <UpsertPopup width="60%" data={oneData} onSave={save} {...configUpsert} />
      <div className="card">
        {toolbar || (
          <Toolbar
            className="mb-4"
            right={
              <Button
                icon="pi pi-plus"
                className="p-button-success"
                label="Thêm"
                onClick={() => {
                  setOneData({})
                  toggle()
                }}
              />
            }
          />
        )}
        <Table data={data} column={columnTable} header={tableHeader} {...(table || {})} />
      </div>
    </>
  )
}

export default Crud
