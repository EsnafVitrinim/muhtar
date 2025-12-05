import {
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
} from "@nextui-org/react";
import { ChevronDownIcon, SearchIcon } from "@/icons";
import { dropdownMenuItemClasses } from "@/constants/styles";

export function TopContent({
  filterValue,
  statusFilter,
  visibleColumns,
  onRowsPerPageChange,
  rows,
  onSearchChange,
  onClear,
  statusOptions,
  columns,
  searchColumnKey,
  setVisibleColumns,
  setStatusFilter,
  actionButtonProps,
  viewsPerPage,
  defaultPerPage
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-center sm:flex-nowrap flex-wrap">
        <Input
          isClearable
          className="w-full sm:max-w-[300px]"
          classNames={{
            input: [
              "bg-transparent text-xs font-light",
              "!text-black dark:!text-slate-200",
              "placeholder:text-xs placeholder:text-slate-400 dark:placeholder:text-dark-100",
            ],
            innerWrapper: "bg-transparent",
            inputWrapper: [
              "bg-slate-100 dark:bg-dark-200",
              "shadow-none",
              'data-[hover=true]:!bg-slate-200/70 dark:data-[hover=true]:!bg-dark-200/50',
              'group-data-[focus=true]:!bg-slate-100 dark:group-data-[focus=true]:!bg-dark-200',
              'caret-black dark:caret-slate-200'
            ],
            clearButton: [
              'text-black dark:text-white'
            ],
          }}
          placeholder={searchColumnKey.placeholder}
          startContent={<SearchIcon className='w-4 text-slate-400 dark:text-dark-100' />}
          value={filterValue}
          onClear={() => onClear()}
          onValueChange={onSearchChange}
        />
        <div className="flex gap-3">
          {
            statusOptions && (
              <Dropdown>
                <DropdownTrigger className="flex">
                  <Button
                    className="border border-slate-200 hover:!bg-slate-200 dark:text-dark-50 dark:border-dark-200 dark:bg-dark-200 dark:hover:!bg-dark-200/50"
                    endContent={<ChevronDownIcon className="w-3" />}
                    size="sm"
                    variant="ghost"
                  >
                    Durumlar
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Table Columns"
                  closeOnSelect={false}
                  selectedKeys={statusFilter}
                  selectionMode="multiple"
                  onSelectionChange={setStatusFilter}
                  itemClasses={dropdownMenuItemClasses}
                >
                  {statusOptions.map((status) => (
                    <DropdownItem key={status.uid} className="capitalize">
                      {status.name}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            )
          }

          <Dropdown>
            <DropdownTrigger className="flex">
              <Button
                className="border border-slate-200 hover:!bg-slate-200 dark:text-dark-50 dark:border-dark-200 dark:bg-dark-200 dark:hover:!bg-dark-200/50"
                endContent={<ChevronDownIcon className="w-3" />}
                size="sm"
                variant="ghost"
              >
                Sütunlar
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={visibleColumns}
              selectionMode="multiple"
              onSelectionChange={setVisibleColumns}
              itemClasses={dropdownMenuItemClasses}
            >
              {columns.map((column) => (
                <DropdownItem key={column.uid} className="capitalize">
                  {column.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          {actionButtonProps && (
            <Button
              className="bg-indigo-700 text-white"
              size="sm"
              {...actionButtonProps}
            >
              {actionButtonProps.text}
            </Button>
          )}

        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-slate-400 dark:text-dark-100 font-light text-xs">Toplam: {rows.length}</span>
        <label htmlFor="rowsPage" className="flex items-center text-slate-400 dark:text-dark-100 font-light text-xs">
          Sayfa başı veri:
          <select
            id='rowsPage'
            className="bg-transparent outline-none text-slate-400 dark:text-dark-100 text-sm"
            onChange={onRowsPerPageChange}
            defaultValue={defaultPerPage || viewsPerPage[0]}
          >
            {viewsPerPage.map(view => <option key={view} defaultValue={defaultPerPage === view} value={view}>{view}</option>)}
          </select>
        </label>
      </div>
    </div>
  );
}

export function BottomContent({ page, pages, setPage }) {
  return (
    <Pagination
      className="m-auto py-1 px-0"
      classNames={{
        cursor: "bg-indigo-700 text-white dark:shadow-none ",
        wrapper: 'bg-slate-100/70 dark:bg-dark-200 shadow-none'
      }}
      isCompact
      showControls
      showShadow
      color="default"
      variant="light"
      page={page}
      total={pages}
      onChange={setPage}
    />
  );
}