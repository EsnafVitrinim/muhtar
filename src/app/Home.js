"use client"

import { usePathname } from "next/navigation";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import { getActiveRoute } from "@/utils/helpers";
import routes from "@/routes";

function Home({ children }) {
  const pathname = usePathname();

  return (
    <div className="flex bg-slate-50 dark:bg-dark-400 h-dvh w-full">
      <Sidebar />
      <div className="duration-300 flex ease min-h-full flex-1 w-full xl:py-2 xl:pr-2 overflow-auto">
        <div className='flex-1 bg-white xl:border overflow-auto no-scrollbar max-h-full border-slate-200 dark:border-dark-200 xl:rounded-lg dark:bg-dark-400 p-4 pt-0'>
          <Navbar brandText={getActiveRoute(routes, pathname)} />
          {children}
        </div>
      </div>
    </div>
  )
}

export default Home
