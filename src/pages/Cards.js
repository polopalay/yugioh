/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable max-lines-per-function */
import { useEffect, useState } from 'react'
import { Image } from 'primereact/image'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { useSelector } from 'react-redux'
import { getDatabase, push, ref, remove, update } from 'firebase/database'
import request from '../apis/request'
import Table from '../components/layout/Table'

const Cards = () => {
  const app = useSelector((state) => state.firebase.app)
  const [cards, setCards] = useState([])
  const [filter, setFilter] = useState({})
  useEffect(async () => {
    // if (filter.archetype) {
    // const rs = await request({
    // url: `https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${filter.name || ''}${
    // filter.format ? `&format=${filter.format}` : ''
    // }${filter.banlist ? `&banlist=${filter.banlist}` : ''}&archetype=${filter.archetype}`,
    // })
    // if (rs.isSuccess) setCards(rs.data.data)
    // } else {
    // const rs = await request({
    // url: `https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${filter.name || ''}${
    // filter.format ? `&format=${filter.format}` : ''
    // }${filter.banlist ? `&banlist=${filter.banlist}` : ''}`,
    // })
    // if (rs.isSuccess) setCards(rs.data.data)
    // }
  }, [filter])
  const column = [
    { value: 'name', name: 'Tên' },
    {
      value: 'archetype',
      name: 'Archetype',
      render: (item) => {
        if (item.archetype) {
          return (
            <Button
              onClick={() => setFilter({ ...filter, archetype: item.archetype })}
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
              {banlist.ban_ocg && <p>OCG: {banlist.ban_ocg}</p>}
              {banlist.ban_tcg && <p>TCG: {banlist.ban_tcg}</p>}
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
  return (
    <>
      <div className="card">
        <Toolbar
          className="mb-4"
          right={
            <div className="flex">
              <InputText
                placeholder="archetype"
                className="mr-2"
                value={filter.archetype}
                onChange={(e) => setFilter({ ...filter, archetype: e.target.value })}
              />
              <InputText
                placeholder="Tên"
                className="mr-2"
                value={filter.name}
                onChange={(e) => setFilter({ ...filter, name: e.target.value })}
              />
              <Dropdown
                optionValue="value"
                optionLabel="name"
                className="mr-2"
                value={filter.format}
                onChange={(e) => setFilter({ ...filter, format: e.value })}
                options={[
                  { name: 'Tất cả', value: undefined },
                  { name: 'OCG', value: 'ocg' },
                  { name: 'TCG', value: 'tcg' },
                  { name: 'Goat', value: 'goat' },
                  { name: 'OCG Goat', value: 'ocg goat' },
                  { name: 'Speed Duel', value: 'speed duel' },
                  { name: 'Rush Duel', value: 'rush duel' },
                  { name: 'Duel Links', value: 'duel links' },
                ]}
                placeholder="Format"
              />
              <Dropdown
                optionValue="value"
                optionLabel="name"
                value={filter.banlist}
                onChange={(e) => setFilter({ ...filter, banlist: e.value })}
                options={[
                  { name: 'Tất cả', value: undefined },
                  { name: 'OCG', value: 'OCG' },
                  { name: 'TCG', value: 'TCG' },
                  { name: 'Goat', value: 'Goat' },
                ]}
                placeholder="Banlist"
              />
            </div>
          }
        />
        <Table data={cards} column={column} />
      </div>
    </>
  )
}

export default Cards
