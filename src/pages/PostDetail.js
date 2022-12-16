import { getDatabase, onValue, ref } from 'firebase/database'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Output from 'editorjs-react-renderer'

function PostDetail(props) {
  const { match } = props
  const { params } = match
  const { id } = params
  const app = useSelector((state) => state.firebase.app)
  const [data, setData] = useState(null)
  if (id) {
    const database = getDatabase(app)
    const dataRef = ref(database, `posts/${id}`)
    useEffect(() => {
      onValue(dataRef, (snapshot) => {
        const rs = snapshot.val()
        setData(rs)
      })
    }, [])
  }
  return (
    <>
      <div className="flex flex-column">
        <div className="flex justify-content-center">
          <h4 className="m-0">{data && data.title}</h4>
        </div>
        <hr />
        <div className="flex justify-content-start mb-2">
          <b className="mr-2">
            <i className="pi pi-calendar mr-2" />
            {data && data.date}
          </b>
          <b>
            <i className="pi pi-user mr-2" />
            {data && data.author}
          </b>
        </div>
        <div>{data && data.content && <Output data={{ blocks: data.content }} />}</div>
      </div>
    </>
  )
}

export default withRouter(PostDetail)
