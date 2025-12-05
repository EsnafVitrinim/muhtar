import { ChevronDownIcon } from '@/icons';
import Link from 'next/link';
import { useState } from 'react';

function MenuItem({ activeRoute, route }) {
  const { name, icon, menuLinks } = route;

  const hasActiveLink = menuLinks.some((link) => activeRoute(link.path));
  const [isOpenDropMenu, setIsOpenDropMenu] = useState(hasActiveLink);

  return (
    <li>
      <button
        className={`w-full ${isOpenDropMenu ? 'bg-white border-slate-200 text-slate-900 dark:border-dark-200 dark:bg-dark-300 dark:text-dark-50 shadow-sm dark:shadow-none' : 'text-slate-600 dark:text-dark-100 border-transparent'} border hover:border-slate-200 rounded-lg py-2 px-3 flex items-center gap-2 leading-1 font-normal text-sm hover:bg-white dark:hover:border-dark-200 dark:hover:bg-dark-200 dark:hover:text-dark-50 duration-200`}
        onClick={() => setIsOpenDropMenu(!isOpenDropMenu)}
      >
        {icon}
        {name}
        <ChevronDownIcon className={`ml-auto duration-200 ${isOpenDropMenu ? 'text-inherit transform rotate-180' : 'text-slate-400'}`} width={18} />
      </button>
      {
        isOpenDropMenu && (
          <div className='border-l-2 border-slate-200 dark:border-dark-200 ml-5 my-1'>
            {
              menuLinks.map((route, index) => {
                const isActive = activeRoute(route.path);
                return (<Link
                  key={index}
                  className={`w-full ${isActive ? 'text-slate-600 dark:text-dark-100' : 'text-slate-500 dark:text-dark-100'} rounded-md py-2 px-3 flex items-center gap-2 leading-1 font-light text-sm hover:text-slate-600 dark:hover:text-dark-50 duration-200`}
                  href={route.path}
                >
                  {route.name}
                </Link>)
              })
            }
          </div>
        )
      }
    </li>
  )
}

export default MenuItem
