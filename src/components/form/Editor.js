import Paragraph from '@editorjs/paragraph'
import ImageTool from '@editorjs/image'
import Marker from '@editorjs/marker'
import Quote from '@editorjs/quote'
import InlineCode from '@editorjs/inline-code'
import ListTool from '@editorjs/list'
import RawTool from '@editorjs/raw'
import Delimiter from '@editorjs/delimiter'
import Table from '@editorjs/table'
import EditorJS from '@editorjs/editorjs'
import { useEffect } from 'react'
import { toBase64 } from '../../utils/file'
import AlignmentBlockTune from '../tools/AlignmentBlockTune'

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
  paragraph: { class: Paragraph, tunes: ['alignment'], inlineToolbar: true },
  marker: Marker,
  delimiter: Delimiter,
  quote: { class: Quote },
  inlineCode: InlineCode,
  list: { class: ListTool, inlineToolbar: true },
  table: Table,
  image: {
    class: ImageTool,
    config: { uploader: { uploadByFile, uploadByUrl } },
    inlineToolbar: true,
  },
  raw: RawTool,
  alignment: {
    class: AlignmentBlockTune,
    inlineToolbar: true,
  },
}

const Editor = (props) => {
  const { value, onChange } = props
  useEffect(() => {
    const init = new EditorJS({
      holder: 'editor',
      tools,
      logLevel: 'ERROR',
      onChange: async () => {
        const data = await init.save()
        if (onChange) onChange(data.blocks)
      },
      onReady: () => {
        if (value) init.blocks.render({ blocks: value })
      },
    })
  }, [])
  return (
    <>
      <div id="editor" className="editor-container" />
    </>
  )
}

export default Editor
