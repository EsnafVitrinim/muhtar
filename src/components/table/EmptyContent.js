import { Button } from '@nextui-org/react'
import React from 'react'

function EmptyContent({ emptyContentActions }) {
  if (!emptyContentActions) return;

  return (
    <Button
      className='w-full max-w-[350px] h-[150px] p-4 my-4 border-2 border-slate-300 border-dashed bg-slate-50 hover:bg-slate-100 text-sm text-slate-400 dark:border-slate-500 dark:bg-dark-200 dark:text-slate-400'
      {...emptyContentActions}
    >
      {emptyContentActions.text}
    </Button>
  )
}

export default EmptyContent
