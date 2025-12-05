"use client"

import { Select, SelectItem } from '@nextui-org/react';

function SelectBox({ ...props }) {
  return (
    <Select
      size='sm'
      labelPlacement='outside-left'
      classNames={{
        base: 'items-center gap-1',
        label: "text-xs !min-w-[90px] text-navy-700 dark:text-dark-50 pb-1 !ps-0 !pe-0 text-left",
        trigger: [
          "bg-transparent border-2 border-slate-200",
          "dark:bg-dark-300 dark:border-dark-200",
          "p-2 h-auto",
          "data-[hover=true]:bg-slate-50 dark:data-[hover=true]:bg-dark-200",
          "shadow-none"
        ],
        listboxWrapper: "max-h-[400px]",
        value: 'text-xs'
      }}
      listboxProps={{
        itemClasses: {
          base: [
            "rounded-lg",
            "text-black dark:text-dark-50",
            "transition-opacity",
            "data-[hover=true]:!bg-slate-200",
            "dark:data-[hover=true]:!bg-dark-200",
            "data-[selectable=true]:focus:!bg-slate-200",
            "dark:data-[selectable=true]:focus:!bg-dark-200",
            "data-[pressed=true]:opacity-70",
          ],
        },
      }}
      popoverProps={{
        classNames: {
          content: "p-0 border border-slate-200 bg-white dark:bg-dark-300 dark:border-dark-200",
        },
      }}
      {...props}
    >
      {(item) => <SelectItem>{item.label}</SelectItem>}
    </Select>
  )
}

export default SelectBox
