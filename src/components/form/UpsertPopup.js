/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable max-lines-per-function */
import { getStorage, uploadString, ref, getDownloadURL, uploadBytes } from 'firebase/storage'
import { Button } from 'primereact/button'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { formatBase64, isBase64 } from '../../utils/string'
import Modal from '../popup/Modal'
import Upsert from './Upsert'

const UpsertPopup = (props) => {
  const app = useSelector((state) => state.firebase.app)
  const storage = getStorage(app)
  const { fields, toggle, onSave, data, types } = props
  let { required, minLength, name } = props
  const [values, setValues] = useState({ ...data })
  const [error, setError] = useState({})

  required = required || []
  minLength = minLength || {}
  name = name || {}

  useEffect(() => {
    setError({})
    setValues({ ...data })
  }, [data])

  const save = async () => {
    const newError = {}
    required.forEach((key) => {
      if (!fields.find((i) => key === i)) {
        return
      }
      if (values[key] === '' || values[key] === undefined || values[key] === null) {
        newError[key] = `Trường ${name[key] || key} là bắt buộc!`
      }
    })
    Object.keys(minLength).forEach((key) => {
      if (!fields.find((i) => key === i)) {
        return
      }
      if (typeof values[key] === 'string') {
        if (values[key].length < minLength[key]) {
          newError[key] = `Trường ${name[key] || key} phải lớn hơn ${minLength[key]} ký tự!`
        }
      }
    })
    setError(newError)
    if (Object.keys(newError).length === 0) {
      for (const key of Object.keys(types)) {
        if (types[key] === 'editor') {
          const blocks = values[key]
          if (blocks) {
            for (let i = 0; i < blocks.length; i++) {
              const block = blocks[i]
              if (block.type === 'image') {
                if (isBase64(block.data.file.url)) {
                  let img
                  const storageRef = ref(storage, `images/${new Date().toString()}.png`)
                  const rs = await uploadString(
                    storageRef,
                    formatBase64(block.data.file.url),
                    'base64',
                  )
                  if (rs) img = await getDownloadURL(rs.ref)
                  block.data.file.url = img
                }
              }
            }
          }
        }
        if (types[key] === 'file') {
          if (values[key]) {
            if (typeof values[key] !== 'string') {
              const storageRef = ref(storage, `images/${new Date().toString()}`)
              const rsUpload = await uploadBytes(storageRef, values[key])
              if (rsUpload) values[key] = await getDownloadURL(rsUpload.ref)
            }
          }
        }
      }
      if (onSave) onSave(values)
    }
  }

  const footer = () => (
    <div className="flex justify-content-end w-full pt-2">
      <Button
        label="Huỷ"
        className="p-button-secondary mr-2"
        onClick={() => {
          if (toggle) toggle()
        }}
      />
      <Button
        onClick={() => {
          save()
          // toggle && toggle()
        }}
        label="Lưu"
      />
    </div>
  )
  return (
    <Modal {...props} footer={footer}>
      <div className="mt-4">
        <Upsert
          {...props}
          values={values}
          setValues={setValues}
          error={error}
          setError={setError}
        />
      </div>
    </Modal>
  )
}

export default UpsertPopup
