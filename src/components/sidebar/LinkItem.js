import Link from 'next/link';

function LinkItem({ activeRoute, route, mainPath }) {
  const { name, icon, path } = route;
  const isActive = activeRoute(path);

  return (
    <li>
      <Link
        className={`w-full ${isActive ? 'bg-indigo-50 border-indigo-400 text-indigo-600 dark:border-indigo-500 dark:bg-indigo-800/10 dark:text-dark-50' : 'text-slate-600 dark:text-dark-100 border-transparent'} whitespace-nowrap border hover:border-indigo-400 rounded-lg py-2 px-3 flex items-center gap-3 leading-1 font-normal text-sm hover:bg-indigo-50 hover:text-indigo-600 dark:hover:border-indigo-500 dark:hover:bg-indigo-800/10 dark:hover:text-dark-50 duration-200`}
        href={mainPath ? mainPath + path : path}
      >
        <span className='text-indigo-500 dark:text-indigo-400'>{icon}</span>
        {name}
      </Link>
    </li>
  )
}

export default LinkItem
