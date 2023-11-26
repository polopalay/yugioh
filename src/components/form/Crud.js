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
  const getData = async () => {
    const rs = await processor.getAll()
    setData(rs)
  }
  useEffect(async () => {
    await getData()
  }, [])
  const [visible, setVisible] = useState(false)
  const toast = useSelector((store) => store.notify.toast)
  const confirm = useSelector((store) => store.notify.confirm)
  const toggle = () => setVisible(!visible)
  const save = async (value) => {
    const rs = await processor.upsert(value)
    toggle()
    toast(rs)
    await getData()
  }
  const deleteOnClick = async (id) => {
    const rs = await processor.delete(id)
    console.log(rs)
    toast(rs)
    await getData()
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
              onClick={async () => {
                const rs = await processor.getOne(value.id)
                setOneData(rs)
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
