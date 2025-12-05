"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { renderData } from "./renderData";
import { BottomContent, TopContent } from "./TableComponents";
import { useTableLogic } from "./useTableLogic";
import TitleWithIcon from "../title";
import EmptyContent from "./EmptyContent";

export default function TableUI({ hideTopContent, hideBottomContent, tableData, actionButtonProps, headerProps, viewsPerPage, defaultPerPage, emptyContentActions }) {
  const {
    filterValue,
    selectedKeys,
    visibleColumns,
    statusFilter,
    sortDescriptor,
    page,
    headerColumns,
    sortedItems,
    pages,
    onRowsPerPageChange,
    onSearchChange,
    onClear,
    setSelectedKeys,
    setVisibleColumns,
    setStatusFilter,
    setSortDescriptor,
    setPage,
  } = useTableLogic(tableData, defaultPerPage);

  const topContent = <TopContent
    filterValue={filterValue}
    statusFilter={statusFilter}
    visibleColumns={visibleColumns}
    onRowsPerPageChange={onRowsPerPageChange}
    rows={tableData.rows}
    onSearchChange={onSearchChange}
    onClear={onClear}
    statusOptions={tableData.statusOptions}
    columns={tableData.columns}
    searchColumnKey={tableData.searchColumnKey}
    setVisibleColumns={setVisibleColumns}
    setStatusFilter={setStatusFilter}
    actionButtonProps={actionButtonProps}
    viewsPerPage={viewsPerPage}
    defaultPerPage={defaultPerPage}
  />
  const bottomContent = <BottomContent
    page={page}
    pages={pages}
    setPage={setPage}
  />

  const isEmptyContent = tableData.rows.length === 0 && emptyContentActions;

  return (
    <div className="flex flex-col gap-4">
      {headerProps && <TitleWithIcon icon={headerProps.icon} title={headerProps.title} description={headerProps.description} />}
      <div className="w-full overflow-auto">
        <Table
          removeWrapper
          color="primary"
          bottomContent={hideBottomContent || (pages <= 1) ? null : bottomContent}
          topContent={hideTopContent ? null : topContent}
          selectedKeys={selectedKeys}
          selectionMode="none"
          sortDescriptor={sortDescriptor}
          onSelectionChange={setSelectedKeys}
          onSortChange={setSortDescriptor}
        >
          {!isEmptyContent && (
            <TableHeader columns={headerColumns}>
              {(column) => (
                <TableColumn
                  className="bg-slate-100 dark:bg-dark-200 text-xs font-light text-slate-500 dark:text-dark-100 hover:bg-slate-200/70 dark:hover:bg-dark-200/50 duration-300"
                  key={column.uid}
                  align={column.uid === "actions" ? "center" : "start"}
                  allowsSorting={column.sortable}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
          )}
          <TableBody
            emptyContent={isEmptyContent ? <EmptyContent emptyContentActions={emptyContentActions} /> : 'Bulunamadı!'}
            items={sortedItems}
          >
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => {
                  const columnType = headerColumns.find(col => col.uid === columnKey).type;
                  return <TableCell>{renderData(item, columnKey, columnType)}</TableCell>;
                }}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
