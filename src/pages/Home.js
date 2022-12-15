import { getDatabase, onValue, ref } from 'firebase/database'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Output from 'editorjs-react-renderer'
import { jsonToList } from '../utils/format'

function Home() {
  const app = useSelector((state) => state.firebase.app)
  const [data, setData] = useState([])
  const database = getDatabase(app)
  const dataRef = ref(database, 'posts')
  useEffect(() => {
    onValue(dataRef, (snapshot) => {
      const rawList = snapshot.val()
      const list = jsonToList(rawList)
      setData(list)
    })
  }, [])
  return (
    <>
      {data.map((item) => (
        <Output data={{ blocks: item.content }} />
      ))}
    </>
  )
}

export default withRouter(Home)
