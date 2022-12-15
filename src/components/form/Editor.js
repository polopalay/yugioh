/* eslint-disable no-unused-vars */
import Paragraph from '@editorjs/paragraph'
import ImageTool from '@editorjs/image'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import InlineCode from '@editorjs/inline-code'
import ListTool from '@editorjs/list'
import Delimiter from '@editorjs/delimiter'
import EditorJS from '@editorjs/editorjs'
import { useEffect } from 'react'
import { toBase64 } from '../../utils/file'

const uploadByFile = async (file) => {
  const data = await toBase64(file)
  return {
    success: 1,
    file: {
      url: data,
    },
  }
}
const uploadByUrl = async (url) => {
  return {
    success: 1,
    file: {
      url,
    },
  }
}
const tools = {
  delimiter: Delimiter,
  paragraph: { class: Paragraph, inlineToolbar: true },
  quote: { class: Quote, inlineToolbar: true },
  marker: Marker,
  inlineCode: InlineCode,
  list: { class: ListTool, inlineToolbar: true },
  image: {
    class: ImageTool,
    config: { uploader: { uploadByFile, uploadByUrl } },
  },
}

const Editor = (props) => {
  const { setEditor } = props
  useEffect(() => {
    const init = new EditorJS({
      holder: 'editor',
      tools,
      logLevel: 'ERROR',
    })
    if (setEditor) setEditor(init)
  }, [])
  return (
    <>
      <div id="editor" className="editor-container" />
    </>
  )
}

export default Editor
