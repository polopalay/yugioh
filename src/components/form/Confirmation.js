import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'

const Confirmation = (props) => {
  const { visible, toggle, onClick, header, body } = props
  const footer = (
    <>
      <Button
        type="button"
        label="Không"
        icon="pi pi-times"
        onClick={() => {
          toggle()
          if (onClick) onClick(false)
        }}
        className="p-button-text p-button-danger"
      />
      <Button
        type="button"
        label="Có"
        icon="pi pi-check"
        onClick={() => {
          toggle()
          if (onClick) onClick(true)
        }}
        className="p-button-text"
        autoFocus
      />
    </>
  )

  return (
    <Dialog
      header={header}
      visible={visible}
      onHide={toggle}
      style={{ width: '350px' }}
      modal
      footer={footer}
    >
      <div className="flex align-items-center justify-content-center">
        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
        <span>{body}</span>
      </div>
    </Dialog>
  )
}
export default Confirmation
