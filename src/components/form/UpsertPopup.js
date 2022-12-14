import { Button } from 'primereact/button'
import { useEffect, useState } from 'react'
import Modal from '../popup/Modal'
import Upsert from './Upsert'

const UpsertPopup = (props) => {
  const { fields, toggle, onSave, data } = props
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

  const save = () => {
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
