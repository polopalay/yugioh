/* eslint-disable no-unused-vars */
import { getDatabase, onValue, ref } from 'firebase/database'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Card } from 'primereact/card'
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
      const list = jsonToList(rawList)
      setData(list)
    })
  }, [])
  return (
    <>
      <div className="grid">
        {data.map((item) => (
          <Link className="col-12 md:col-6 lg:col-4" to={`/postDetail/${item.id}`}>
            <Card title={<p className="text-color">{item.title}</p>} className="p-0">
              <div className="flex">
                <div className="border-round" style={{ width: '60%', height: 180 }}>
                  <Image
                    src={item.thumnail}
                    imageClassName="w-full border-round"
                    imageStyle={{ objectFit: 'cover', height: 180 }}
                  />
                </div>
                <div className="px-3 flex flex-column" style={{ width: '40%', height: 180 }}>
                  <b className="mb-1">
                    <i className="pi pi-user mr-2" />
                    {item.author}
                  </b>
                  <b className="mb-1">
                    <i className="pi pi-calendar mr-2" />
                    {item.date}
                  </b>
                  <p>{item.description}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </>
  )
}

export default withRouter(Home)
