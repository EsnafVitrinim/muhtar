"use client"

import { BarsIcon, MoonIcon, SunIcon, XMarkIcon } from '@/icons'
import { useDispatch, useSelector } from 'react-redux'
import SELECTORS from "@/store/selectors";
import { toggleDarkMode, toggleSidebar } from '@/store/reducers/ui/uiReducer'

function Navbar({ brandText }) {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(SELECTORS.getIsDarkTheme);
  const isSidebarOpen = useSelector(SELECTORS.getIsSidebarOpened);

  return (
    <nav className="sticky top-0 z-40 bg-white h-16 border-b border-slate-200 dark:bg-dark-400 dark:border-dark-200 flex flex-row flex-wrap items-center justify-between">
      <h2 className="font-semibold text-xl capitalize text-black dark:text-white">{brandText}</h2>
      <div className="flex items-center gap-2 h-full">
        <div
          className="xl:hidden cursor-pointer text-gray-600"
          onClick={() => dispatch(toggleSidebar())}
        >
          {
            !isSidebarOpen ? <BarsIcon className="h-full px-2 py-1 w-[36px] text-gray-600 dark:text-white" /> : <XMarkIcon className="h-full px-2 py-1 w-[36px] text-gray-600 dark:text-white" />
          }
        </div>

        <div
          className="cursor-pointer text-gray-600"
          onClick={() => dispatch(toggleDarkMode())}
        >
          {isDarkMode ? (
            <SunIcon className="h-full px-2 py-1 w-[36px] text-gray-600 dark:text-white" />
          ) : (
            <MoonIcon className="h-full px-2 py-1 w-[36px] text-gray-600 dark:text-white" />
          )}
        </div>
      </div>
    </nav>

  )
}

export default Navbar