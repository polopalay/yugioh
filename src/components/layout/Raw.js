import Table from './Table'

const Raw = (props) => {
  const { blocks } = props
  return blocks.map((block) => {
    switch (block.type) {
      case 'paragraph': {
        const { tunes } = block
        const { alignment } = tunes
        return (
          <p
            className={`my-2 p-0 text-${alignment.alignment || 'left'}`}
            dangerouslySetInnerHTML={{ __html: block.data.text }}
          />
        )
      }
      case 'image':
        return (
          <div className="flex justify-content-center my-2">
            <img src={block.data.file.url} alt="img" className="max-w-full border-round" />
          </div>
        )
      case 'raw':
        return <div dangerouslySetInnerHTML={{ __html: block.data.html }} />
      case 'table': {
        const { content, withHeadings } = block.data
        if (!content || content.length === 0) return ''
        const datas = []
        const column = []
        if (withHeadings) {
          content[0].forEach((item) => {
            column.push({ value: item, name: item })
          })
        }
        content.forEach((item, indexOut) => {
          if (withHeadings) {
            if (indexOut !== 0) {
              const data = {}
              item.forEach((itemSon, index) => {
                if (column[index]) {
                  data[column[index].name] = itemSon
                }
              })
              datas.push(data)
            }
          } else {
            const data = {}
            item.forEach((itemSon, index) => {
              data[index.toString()] = itemSon
              if (!column.find((col) => col.name === index)) {
                column.push({ value: index.toString(), name: '' })
              }
            })
            datas.push(data)
          }
        })
        return (
          <div className="tbl-no-paging my-2">
            <Table take={1000} data={datas} column={column} paginatorTemplate="" />
          </div>
        )
      }
      case 'quote':
        return (
          <div className="flex justify-content-center my-2">
            <div className="border-solid border-round border-1 p-3 max-w-30rem">
              <p dangerouslySetInnerHTML={{ __html: block.data.text }} />
            </div>
          </div>
        )
      default:
        return ''
    }
  })
}

export default Raw
