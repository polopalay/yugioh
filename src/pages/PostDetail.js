import { get, getDatabase, ref } from 'firebase/database'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Raw from '../components/layout/Raw'

function PostDetail(props) {
  const { match } = props
  const { params } = match
  const { id } = params
  const app = useSelector((state) => state.firebase.app)
  const [data, setData] = useState(null)
  if (id) {
    const database = getDatabase(app)
    useEffect(async () => {
      const contentRef = ref(database, `contents/${id}`)
      const content = (await get(contentRef)).val()
      setData(content)
    }, [])
  }
  return <div>{data && <Raw blocks={data.content} />}</div>
}

export default withRouter(PostDetail)
