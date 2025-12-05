import { Snippet } from '@nextui-org/react'

function CopySnippet({ item }) {
  return (
    <Snippet
      className="w-auto max-w-max bg-slate-100 dark:bg-dark-200 flex gap-1 p-3"
      classNames={{
        pre: "whitespace-break-spaces	block break-all"
      }}
      size="sm"
      symbol=''
    >{item}</Snippet>
  )
}

export default CopySnippet
