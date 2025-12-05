"use client"

import routes, { bottomRoutes } from '@/routes'
import SidebarLinks from './SidebarLinks'
import { useDispatch, useSelector } from 'react-redux'
import { Button, User } from '@nextui-org/react'
import { toggleSidebar } from '@/store/reducers/ui/uiReducer'
import { BarsIcon, LogOutIcon, TrashIcon, XMarkIcon } from '@/icons'
import SELECTORS from "@/store/selectors";
import { signOut } from 'next-auth/react'
import { signOutRequest } from '@/store/actionCreators'
import Link from 'next/link'

function Sidebar() {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector(SELECTORS.getIsSidebarOpened);

  return (
    <div className={`sidebar ${isSidebarOpen ? 'isOpen' : ''} md:px-4 flex flex-col overflow-auto duration-300 md:py-2 py-1 pb-4 ease md:sticky absolute top-0 z-50 h-dvh bg-white dark:bg-dark-300 shadow-2xl shadow-white/5 dark:shadow-none dark:text-white md:border-none border-r border-slate-200 dark:border-dark-200`}>
      <div className='flex flex-col overflow-hidden h-full md:px-0 px-4'>
        <div className="flex items-center gap-2 py-4 border-b border-slate-200 dark:border-dark-200 mb-4">
          <div onClick={() => dispatch(toggleSidebar())} className='min-w-[42px] flex justify-center items-center cursor-pointer'>
            {!isSidebarOpen ? <BarsIcon width={22} /> : <XMarkIcon width={22} />}
          </div>
          <h1 className='text-lg font-medium truncate'>Tebligat Takip</h1>
        </div>

        <ul className='flex flex-col gap-1 py-2'>
          <SidebarLinks routes={routes} />
        </ul>

        <ul className='mt-auto flex flex-col gap-1 py-2'>
          <SidebarLinks routes={bottomRoutes} />
          <li>
            <Button
              className='w-full bg-transparent justify-start text-red-500 dark:text-red-400 rounded-lg py-2 px-3 flex items-center gap-2 leading-1 font-normal text-sm'
              onClick={() => { dispatch(signOutRequest()); signOut(); }}
              startContent={<LogOutIcon width={18} />}
            >
              Çıkış Yap
            </Button>
          </li>
        </ul>

        <span className='truncate border-t border-slate-200 dark:border-dark-200 text-center text-xs text-slate-500 dark:text-dark-100 py-3'>
          © 2024 <Link href='https://www.linkedin.com/in/yasinakbulut/' target='_blank' className='hover:text-blue-600 underline underline-offset-2 decoration-slate-500 dark:decoration-dark-100'>Yasin Akbulut</Link>
        </span>
      </div>
    </div>
  )
}

export default Sidebar