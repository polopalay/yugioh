import Paragraph from '@editorjs/paragraph'
import ImageTool from '@editorjs/image'
import Marker from '@editorjs/marker'
import Quote from '@editorjs/quote'
import InlineCode from '@editorjs/inline-code'
import ListTool from '@editorjs/list'
import Delimiter from '@editorjs/delimiter'
import EditorJS from '@editorjs/editorjs'
import AlignmentTuneTool from 'editorjs-text-alignment-blocktune'
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
  paragraph: { class: Paragraph, tunes: ['alignment'] },
  marker: Marker,
  delimiter: Delimiter,
  quote: { class: Quote, inlineToolbar: true },
  inlineCode: InlineCode,
  list: { class: ListTool, inlineToolbar: true },
  image: {
    class: ImageTool,
    config: { uploader: { uploadByFile, uploadByUrl } },
  },
  alignment: {
    class: AlignmentTuneTool,
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
