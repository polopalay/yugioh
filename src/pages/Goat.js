import { getDatabase, onValue, ref } from 'firebase/database'
import { Button } from 'primereact/button'
import { Image } from 'primereact/image'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Table from '../components/layout/Table'

const Goat = () => {
  const app = useSelector((state) => state.firebase.app)
  const [data, setData] = useState([])
  useEffect(() => {
    const database = getDatabase(app)
    const dataRef = ref(database, 'goat')
    onValue(dataRef, (snapshot) => {
      const rawList = snapshot.val()
      console.log(rawList)
      setData(rawList)
    })
  }, [])
  const column = [
    { value: 'name', name: 'Tên' },
    {
      value: 'archetype',
      name: 'Archetype',
      render: (item) => {
        if (item.archetype) {
          return (
            <Button
              // onClick={() => setFilter({ ...filter, archetype: item.archetype })}
              className="p-button-text"
              label={item.archetype}
            />
          )
        }
      },
    },
    {
      value: 'banlist',
      name: 'Banlist',
      render: (item) => {
        if (item.banlist_info) {
          const banlist = item.banlist_info
          return (
            <div className="flex flex-column">
              {banlist.ban_goat && <p>GOAT: {banlist.ban_goat}</p>}
            </div>
          )
        }
      },
    },
    {
      value: 'card_images',
      name: 'Ảnh',
      render: (item) => {
        const image = item.card_images[0]
        if (image) {
          return <Image src={image.image_url} alt="card" imageClassName="max-w-5rem" preview />
        }
      },
    },
  ]
  console.log(data)
  return (
    <>
      <div className="card">
        <Table data={data} column={column} />
      </div>
    </>
  )
}
export default Goat
