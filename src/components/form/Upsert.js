/* eslint-disable max-lines-per-function */
import { InputText } from 'primereact/inputtext'
import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'
import { InputTextarea } from 'primereact/inputtextarea'
import { FileUpload } from 'primereact/fileupload'
import { Checkbox } from 'primereact/checkbox'
import { dateToDDMMYY, DDMMYYToDate } from '../../utils/date'

const Upsert = (props) => {
  const { values, setValues, error, setError } = props
  let {
    fields,
    col,
    types,
    name,
    required,
    disable,
    options,
    maxLength,
    minLength,
    selectSearcher,
  } = props
  fields = fields || []
  col = col || {}
  types = types || {}
  name = name || {}
  required = required || []
  disable = disable || []
  options = options || {}
  maxLength = maxLength || {}
  minLength = minLength || {}
  selectSearcher = selectSearcher || {}

  const handleChange = (key, value) => {
    error[key] = undefined
    values[key] = value
    setValues({ ...values })
    if (setError) setError({ ...error })
  }

  const renderInput = (key) => {
    switch (types[key]) {
      case 'select':
        return (
          <Dropdown
            className={`w-full ${error[key] ? 'p-invalid' : ''}`}
            optionValue="id"
            optionLabel="name"
            value={values[key]}
            onChange={(e) => handleChange(key, e.value)}
            options={options[key] || []}
            placeholder={name[key] || key}
            filter
            filterBy={selectSearcher[key] || 'name'}
            disabled={disable.includes(key)}
          />
        )
      case 'checkbox':
        return (
          <div className="w-full">
            <Checkbox checked={values[key]} onChange={(e) => handleChange(key, e.checked)} />
          </div>
        )
      case 'password':
        return (
          <InputText
            maxLength={maxLength[key]}
            minLength={minLength[key]}
            className={`w-full ${error[key] ? 'p-invalid' : ''}`}
            type="password"
            // placeholder={name[key] || key}
            onChange={(e) => handleChange(key, e.target.value)}
            value={values[key]}
            disabled={disable.includes(key)}
            mode="decimal"
          />
        )
      case 'date':
        return (
          <div className="w-full">
            <Calendar
              className={`w-full ${error[key] ? 'p-invalid' : ''}`}
              showIcon
              showButtonBar
              dateFormat="dd/mm/yy"
              value={values[key] ? DDMMYYToDate(values[key]) : undefined}
              onChange={(e) => {
                if (e.value) {
                  handleChange(key, dateToDDMMYY(e.value))
                } else {
                  handleChange(key, undefined)
                }
              }}
              disabled={disable.includes(key)}
            />
          </div>
        )
      case 'text-area':
        return (
          <div className="w-full">
            <InputTextarea
              className={`w-full ${error[key] ? 'p-invalid' : ''}`}
              rows={2}
              // cols={30}
              value={values[key]}
              onChange={(e) => handleChange(key, e.target.value)}
              autoResize
              disabled={disable.includes(key)}
            />
          </div>
        )
      case 'file':
        return (
          <FileUpload
            mode="basic"
            className="w-full"
            onSelect={(event) => {
              const { files } = event.originalEvent.target
              if (files.length === 0) return
              const file = files[0]
              handleChange(key, file)
            }}
            customUpload
            uploadHandler={(event) => {
              event.options.clear()
            }}
            chooseOptions={{
              label: 'Chọn một file',
              icon: 'pi pi-upload',
              className: 'p-button-secondary w-full',
            }}
          />
        )

      default:
        return (
          <InputText
            maxLength={maxLength[key]}
            minLength={minLength[key]}
            className={`w-full ${error[key] ? 'p-invalid' : ''}`}
            type="text"
            // placeholder={name[key] || key}
            onChange={(e) => handleChange(key, e.target.value)}
            value={values[key]}
            disabled={disable.includes(key)}
          />
        )
    }
  }

  return (
    <div className="grid">
      {fields.map((key) => (
        <div className={`col-12 lg:col-${col[key] || 6} flex flex-column`}>
          <div className="field">
            {
              // <span className="p-float-label">
            }
            <label className={required.includes(key) ? 'required' : ''} htmlFor={key}>
              {`${name[key] || key}:`}
            </label>
            {renderInput(key)}
            {error[key] && <small className="p-invalid text-red-500">{error[key]}</small>}
            {
              // </span>
            }
          </div>
        </div>
      ))}
    </div>
  )
}
export default Upsert
