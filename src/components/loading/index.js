import { Spinner } from '@nextui-org/react'
import React from 'react'

function Loading() {
  return (
    <div className='w-full h-full flex justify-center items-center p-4'>
      <Spinner color="primary" />
    </div>
  )
}

export default Loading
