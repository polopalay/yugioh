import { Dialog } from 'primereact/dialog'

const Modal = (props) => {
  const { header, footer, visible, toggle, children, width } = props
  return (
    <Dialog
      header={header}
      visible={visible}
      modal
      footer={footer || ''}
      onHide={() => toggle && toggle()}
      style={{ width: width || '50%' }}
    >
      {children}
    </Dialog>
  )
}

export default Modal
