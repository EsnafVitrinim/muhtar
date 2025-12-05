
export const dropdownMenuItemClasses = {
  base: [
    "rounded-md",
    "text-black dark:text-dark-50",
    "transition-opacity",
    "data-[hover=true]:text-foreground",
    "data-[hover=true]:bg-indigo-700",
    "dark:data-[hover=true]:bg-indigo-700",
    "data-[selectable=true]:focus:bg-red-700",
    "data-[selectable=true]:focus:text-white",
    "data-[pressed=true]:opacity-70",
  ],
}

export const modalClasses = {
  body: "py-6",
  base: "bg-white dark:bg-dark-400 text-black dark:text-dark-100",
  closeButton: "hover:bg-white/5 active:bg-white/10",
}
