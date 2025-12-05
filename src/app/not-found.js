import { ChevronDownIcon } from "@/icons";

function NotFound() {
  return (
    <div
      className='w-full h-dvh fixed left-0 top-0 bg-slate-50 dark:bg-dark-400 flex flex-col gap-4 justify-center items-center'
      style={{ zIndex: 9999 }}
    >
      <p className='text-sm text-black dark:text-dark-50'>Üzgünüz, Aradığın Sayfa Bulunamadı 😔</p>
      <a
        className='flex gap-1 text-md bg-transparent text-blue-500'
        href="/">
        <ChevronDownIcon className='transform rotate-90 w-4' /> Siteye Geri Dön
      </a>
    </div>
  )
}

export default NotFound
