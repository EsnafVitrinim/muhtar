"use client"

import { Tabs, Tab } from "@nextui-org/react";

function TabMenu({ tabs, ...props }) {
  return (
    <Tabs
      size="sm"
      variant="underlined"
      items={tabs}
      classNames={{
        tabList: "w-full relative rounded-none p-0 border-b border-slate-200 dark:border-dark-200 mb-4",
        cursor: "w-full bg-indigo-700 dark:bg-indigo-400",
        tab: "max-w-fit px-0 px-4 h-12",
        tabContent: "group-data-[selected=true]:text-indigo-700 group-data-[selected=true]:dark:text-indigo-400 text-slate-400 dark:text-dark-100"
      }}
      {...props}
    >
      {(item) => (
        <Tab key={item.id} title={item.label}>
          {item.content}
        </Tab>
      )}
    </Tabs>
  )
}

export default TabMenu
