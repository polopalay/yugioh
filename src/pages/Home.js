import { getDatabase, onValue, ref } from 'firebase/database'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Image } from 'primereact/image'
import { jsonToList } from '../utils/format'

function Home() {
  const app = useSelector((state) => state.firebase.app)
  const [data, setData] = useState([])
  const database = getDatabase(app)
  const dataRef = ref(database, 'posts')
  useEffect(() => {
    onValue(dataRef, (snapshot) => {
      const rawList = snapshot.val()
      if (rawList) {
        const list = jsonToList(rawList).reverse()
        setData(list)
      }
    })
  }, [])
  return (
    <>
      <div className="grid">
        {data.map((item) => (
          <Link className="col-12 md:col-6 lg:col-3" to={`/postDetail/${item.id}`}>
            <div className="border-round" style={{ width: 'auto', height: 450 }}>
              <Image
                src={item.thumnail}
                imageClassName="w-full border-round"
                imageStyle={{ objectFit: 'cover', height: 450 }}
              />
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

export default withRouter(Home)
