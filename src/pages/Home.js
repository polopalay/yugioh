import { withRouter } from 'react-router-dom'
import Crud from '../components/form/Crud'
import userProcessor from '../processor/userProcessor'

function Home() {
  const moduleName = 'người dùng'
  const processor = userProcessor

  const column = [
    { value: 'userName', name: 'Tên đăng nhập', sortable: true },
    { value: 'name', name: 'Tên', sortable: true },
  ]

  const config = {
    fields: ['userName', 'name'],
    maxLength: { userName: 20, name: 100 },
    required: ['userName'],
    name: {
      userName: 'Tên đăng nhập',
      name: 'Tên',
    },
    disable: (oneData) => (!oneData.id ? [] : ['userName']),
  }

  return (
    <>
      <Crud processor={processor} moduleName={moduleName} column={column} upsert={config} />
    </>
  )
}

export default withRouter(Home)
