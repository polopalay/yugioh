import { useEffect, useState } from 'react'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { useSelector } from 'react-redux'
import UpsertPopup from './UpsertPopup'
import Table from '../layout/Table'

function Crud(props) {
  const { processor, moduleName, column, upsert, table, toolbar, chucNang } = props
  const [oneData, setOneData] = useState({})
  const [data, setData] = useState([])
  const [visible, setVisible] = useState(false)
  const toast = useSelector((store) => store.notify.toast)
  const confirm = useSelector((store) => store.notify.confirm)
  const toggle = () => setVisible(!visible)
  const getDatas = async () => {
    const rs = await processor.getAll()
    setData(rs)
  }
  useEffect(getDatas, [])
  const save = async (value) => {
    const rs = await processor.upsert(value)
    if (rs.isSuccess) {
      toggle()
      getDatas()
    }
    toast({ type: rs.isSuccess ? 'success' : 'error', message: rs.data })
  }
  const deleteOnClick = async () => {
    const rs = await processor.delete(oneData.id)
    toast({ type: rs.isSuccess ? 'success' : 'error', message: rs.data })
    if (rs.isSuccess) getDatas()
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
                setOneData(value)
                confirm({
                  action: deleteOnClick,
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
